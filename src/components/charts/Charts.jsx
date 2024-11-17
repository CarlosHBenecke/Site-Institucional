import React, { useCallback, useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { decodeToken } from '../../utils';
import api from '../../api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

const translateDayOfWeek = (day) => {
    const daysOfWeek = {
        "Sunday   ": "Domingo",
        "Monday   ": "Segunda-feira",
        "Tuesday  ": "Terça-feira",
        "Wednesday": "Quarta-feira",
        "Thursday ": "Quinta-feira",
        "Friday   ": "Sexta-feira",
        "Saturday ": "Sábado"
    };
    return daysOfWeek[day] || day;
};

const Charts = () => {
    const [metrics, setMetrics] = useState({
        averageClicksPerMonth: 0,
        rate: 0,
        clicksPerDayLast7Days: [],
        dayOfWeekWithMostClicks: '',
        findHourWithMostClicks: '',
        favoriteCount: 0,
        categoriesSearches: []
    });

    const [dailyVisitsData, setDailyVisitsData] = useState(null);
    const [interestOverTimeData, setInterestOverTimeData] = useState(null);
    const establishmentId = sessionStorage.getItem("establishmentId");

    const fetchMetrics = useCallback(async () => {
        try {
            const response = await api.get(`/access/dashboard/${establishmentId}`);
            const responseData = response.data;

            const dayOfWeekWithMostClicks = responseData.dayOfWeekWithMostClicks[0];
            const findHourWithMostClicks = responseData.findHourWithMostClicks[0];

            setMetrics({
                averageClicksPerMonth: responseData.averageClicksPerMonth,
                rate: responseData.rate,
                clicksPerDayLast7Days: responseData.clicksPerDayLast7Days,
                dayOfWeekWithMostClicks: dayOfWeekWithMostClicks ? translateDayOfWeek(dayOfWeekWithMostClicks.dayOfWeek) : 'N/A',
                findHourWithMostClicks: findHourWithMostClicks ? findHourWithMostClicks.hour : 'N/A',
                favoriteCount: responseData.favoriteCount,
                categoriesSearches: responseData.categoriesSearches
            });

            // Prepare clicks per day data
            const clicksPerDay = responseData.clicksPerDayLast7Days.map(day => ({
                date: new Date(day.date[0], day.date[1] - 1, day.date[2]),
                count: day.count
            }));
            const labels = clicksPerDay.map(day => day.date.toLocaleDateString());
            const data = clicksPerDay.map(day => Math.floor(day.count / 16));

            const dailyVisits = {
                labels: labels,
                datasets: [
                    {
                        label: 'Clicks nos Últimos 7 Dias',
                        data: data,
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)'
                    }
                ]
            };
            setDailyVisitsData(dailyVisits);

            // Prepare categories searches data
            const interestOverTime = {
                labels: responseData.categoriesSearches.map(item => item.name),
                datasets: [
                    {
                        label: 'Interesse ao Longo do Tempo',
                        data: responseData.categoriesSearches.map(item => item.searchesCount),
                        backgroundColor: 'rgba(153,102,255,0.6)',
                        borderColor: 'rgba(153,102,255,1)',
                        borderWidth: 1
                    }
                ]
            };
            setInterestOverTimeData(interestOverTime);

        } catch (error) {
            console.error("Erro ao obter dados do dashboard:", error);
        }
    }, [establishmentId]);

    useEffect(() => {
        if (establishmentId) {
            fetchMetrics();
        }
    }, [fetchMetrics, establishmentId]);

    const dailyVisitsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Clicks nos Últimos 7 Dias',
            },
        },
    };

    const interestOverTimeOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Interesse ao Longo do Tempo',
            },
        },
    };

    return (
        <>
            <span className={styles.nameOverview}><b>Bem Vindo, {decodeToken(sessionStorage.getItem('qabToken')).name}!</b></span>
            <div className={styles.overview}>
                <div className={styles.metric1}>
                    <span className={styles["chart-titulo"]}><b>Média de Clicks por Mês</b></span><br />
                    <span className={styles["chart-resposta"]}><b>{Math.floor(metrics.averageClicksPerMonth / 16)}</b></span>
                </div>
                <div className={styles.metric2}>
                    <span className={styles["chart-titulo"]}><b>Média Nota</b></span><br />
                    <span></span><br />
                    <span><b className={styles["chart-resposta"]}>{metrics.rate.toFixed(2)}</b></span>
                </div>
                <div className={styles.metric3}>
                    <span className={styles["chart-titulo"]}><b>Dia com mais Clicks</b></span><br />
                    <span></span><br />
                    <span><b className={styles["chart-resposta"]}>{metrics.dayOfWeekWithMostClicks}</b></span>
                </div>
                <div className={styles.metric4}>
                    <span className={styles["chart-titulo"]}><b>Horário com mais Clicks</b></span><br />
                    <span><b className={styles["chart-resposta"]}>{metrics.findHourWithMostClicks}h</b></span>
                </div>
                <div className={styles.metric5}>
                    <span className={styles["chart-titulo"]}><b>Favoritado</b></span><br />
                    <span></span><br />
                    <span><b className={styles["chart-resposta"]}>{metrics.favoriteCount}</b></span>
                </div>
            </div>
            <div className={styles.charts}>
                {dailyVisitsData && (
                    <div className={styles.chart}>
                        <Line data={dailyVisitsData} options={dailyVisitsOptions} />
                    </div>
                )}
                {interestOverTimeData && (
                    <div className={styles.chart}>
                        <Bar data={interestOverTimeData} options={interestOverTimeOptions} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Charts;
