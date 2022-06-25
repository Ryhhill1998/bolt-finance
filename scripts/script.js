// --------------- chartjs graphs --------------- //

// current budget insight
const currentBudgetData = {
  labels: [
    'Rent',
    'Bills',
    'Shopping',
    'Other'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [320, 180, 160, 120],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
    ],
  }]
};

const currentBudgetOptions = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: "Current Budget Distribution",
      color: "white",
    }
  },
  reponsive: true,
  maintainAspectRatio: false,
};

const currentBudgetConfig = {
  type: 'doughnut',
  data: currentBudgetData,
  options: currentBudgetOptions
};

const currentBudgetChart = new Chart(
  document.getElementById('current-budget-doughnut'),
  currentBudgetConfig
);

// desired budget insight
const desiredBudgetData = {
  labels: [
    'Rent',
    'Bills',
    'Shopping',
    'Other'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [320, 180, 160, 120],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
    ],
  }]
};

const desiredBudgetOptions = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: "Desired Budget Distribution",
      color: "white",
      // position: "top",
      // align: "start",
    }
  },
  reponsive: true,
  maintainAspectRatio: false,
};

const desiredBudgetConfig = {
  type: 'doughnut',
  data: desiredBudgetData,
  options: desiredBudgetOptions
};

const desiredBudgetChart = new Chart(
  document.getElementById('desired-budget-doughnut'),
  desiredBudgetConfig
);

// balance change over time insight
const balanceChartLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
];

const balanceChartData = {
  labels: balanceChartLabels,
  datasets: [{
    label: 'Balance',
    data: [1200, 1400, 1650, 2000, 1950, 2300],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
    ],
    borderWidth: 1,
  }]
};

const balanceChartOptions = {
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      color: 'white',
      anchor: "end",
      align: "top",
    },
    title: {
      display: true,
      text: "Balance Change Over Time",
      color: "white",
      // position: "top",
      // align: "start",
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        color: "white"
      }
    },
    y: {
      beginAtZero: true,
      display: false,
    }
  },
  reponsive: true,
  maintainAspectRatio: false,
}

const balanceChartConfig = {
  type: 'bar',
  data: balanceChartData,
  plugins: [ChartDataLabels],
  options: balanceChartOptions
};

const balanceChart = new Chart(
  document.getElementById('balance-chart'),
  balanceChartConfig
);

// budget remaining insight
const budgetRemainingLabels = [
  'Rent',
  'Bills',
  'Shopping',
  'Other'
];

const budgetRemainingData = {
  labels: budgetRemainingLabels,
  datasets: [{
    label: 'Balance',
    data: [320, 180, 160, 120],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
    ],
    borderWidth: 1,
  }]
};

const budgetRemainingOptions = {
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      color: 'white',
      anchor: "end",
      align: "top",
    },
    title: {
      display: true,
      text: "Budget Remaining",
      color: "white",
      // position: "top",
      // align: "start",
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      align: "center",
      ticks: {
        color: "white"
      }
    },
    y: {
      beginAtZero: true,
      display: false,
    }
  },
  reponsive: true,
  maintainAspectRatio: false,
}

const budgetRemainingConfig = {
  type: 'bar',
  data: budgetRemainingData,
  plugins: [ChartDataLabels],
  options: budgetRemainingOptions
};

const budgetRemainingChart = new Chart(
  document.getElementById('budget-remaining'),
  budgetRemainingConfig
);
