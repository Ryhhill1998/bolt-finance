// --------------- DOM elements --------------- //

const containerApp = document.querySelector(".container-app");

const currBudgetCanvas = document.getElementById("current-budget-doughnut");
const desiredBudgetCanvas = document.getElementById("desired-budget-doughnut");
const balanceCanvas = document.getElementById("balance-chart");
const budgetRemainingCanvas = document.getElementById("budget-remaining");

const dateLabel = document.querySelector(".balance-date");
const balanceValue = document.querySelector(".balance-value");

const transactionsContainer = document.querySelector(".transactions");

const transactionCategory = document.querySelector(".transaction-categories");
const transactionAmount = document.querySelector(".transaction-amount");
const categoryPreset = document.getElementById("preset-selection");
const formBtn = document.querySelector(".form-btn");

const labelSummaryIn = document.querySelector(".label-summary-in");
const labelSummaryOut = document.querySelector(".label-summary-out");


// --------------- app data --------------- //

const account1 = {
  firstName: "Laura",
  LastName: "Jones",
  balanceHistory: [{
      date: '2022-01-25T17:21:38.602Z',
      value: 600,
    },
    {
      date: '2022-02-25T17:21:38.602Z',
      value: 400,
    },
    {
      date: '2022-03-25T17:21:38.602Z',
      value: 1100,
    },
    {
      date: '2022-04-25T17:21:38.602Z',
      value: 1500,
    },
    {
      date: '2022-05-25T17:21:38.602Z',
      value: 2000,
    },
  ],
  transactions: [{
      date: '2022-06-06T17:21:38.602Z',
      category: "bills",
      value: -100,
    },
    {
      date: '2022-06-12T17:21:38.602Z',
      category: "shopping",
      value: -130,
    },
    {
      date: '2022-06-16T17:21:38.602Z',
      category: "other",
      value: -20,
    },
    {
      date: '2022-06-20T17:21:38.602Z',
      category: "salary",
      value: 2000,
    },
    {
      date: '2022-06-22T17:21:38.602Z',
      category: "shopping",
      value: -60,
    },
    {
      date: '2022-06-25T17:21:38.602Z',
      category: "rent",
      value: -1000,
    },
  ],
  budget: {
    rent: 1000,
    shopping: 400,
    bills: 300,
    other: 250
  }
};

const account2 = {
  firstName: "Ethan",
  LastName: "Wilks",
  balanceHistory: [{
      date: '2022-05-25T17:21:38.602Z',
      value: 1200,
    },
    {
      date: '2022-04-25T17:21:38.602Z',
      value: 1500,
    },
    {
      date: '2022-03-25T17:21:38.602Z',
      value: 600,
    },
    {
      date: '2022-02-25T17:21:38.602Z',
      value: 700,
    },
    {
      date: '2022-01-25T17:21:38.602Z',
      value: 100,
    },
  ],
  transactions: [{
      date: '2022-06-04T17:21:38.602Z',
      category: "bills",
      value: -60,
    },
    {
      date: '2022-06-03T17:21:38.602Z',
      category: "bills",
      value: -30,
    },
    {
      date: '2022-06-23T17:21:38.602Z',
      category: "shopping",
      value: -200,
    },
    {
      date: '2022-06-11T17:21:38.602Z',
      category: "other",
      value: -90,
    },
    {
      date: '2022-06-15T17:21:38.602Z',
      category: "salary",
      value: 1500,
    },
    {
      date: '2022-06-10T17:21:38.602Z',
      category: "rent",
      value: -700,
    },
  ],
  budget: {
    rent: 700,
    shopping: 300,
    bills: 180,
    other: 200
  }
};

const accounts = [account1, account2];

const categoryIcons = {
  salary: `<i class="fa-solid fa-sack-dollar"></i>`,
  rent: `<i class="fa-solid fa-house"></i>`,
  shopping: `<i class="fa-solid fa-cart-shopping"></i>`,
  bills: `<i class="fa-solid fa-receipt"></i>`,
  other: `<i class="fa-solid fa-circle-question"></i>`,
};


// --------------- app functions --------------- //

// format date function
const formatDate = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(new Date(date));

// format currency function
const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// calculate and display balance
const displayBalance = account => {
  const transactions = account.transactions;
  account.currentBalance = transactions.reduce((sum, transaction) => sum + transaction.value, 0);
  balanceValue.textContent = `${formatCurrency(account.currentBalance, "en-GB", "GBP")}`;
};

// display date
const displayDate = () => {

  const updateDateLabel = () => {
    dateLabel.textContent = formatDate(new Date(), "en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
  };

  updateDateLabel();
  setInterval(updateDateLabel, 1000);
};

displayDate();

// display transactions
const displayTransactions = account => {

  // local functions
  const sortTransactions = transactions => {
    const createDateNum = dateString => +new Date(dateString);
    transactions.sort((a, b) => createDateNum(a.date) - createDateNum(b.date));
  };

  const formatTransactionDate = date => {
    const daysFromNow = (+new Date() - +date) / (1000 * 60 * 60 * 24);
    if (daysFromNow < 1) return "Today";
    if (daysFromNow < 2) return "Yesterday";
    if (daysFromNow <= 7) return `${Math.floor(daysFromNow)} days ago`;
    return formatDate(date, "en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  // main function
  const accTransactions = account.transactions;

  sortTransactions(accTransactions);

  transactionsContainer.innerHTML = "";
  const header = `<h2 class="section-heading">Transactions</h2>`;

  accTransactions.forEach(transaction => {
    const date = formatTransactionDate(new Date(transaction.date));
    const category = transaction.category;
    const icon = categoryIcons[category];
    const value = formatCurrency(transaction.value, "en-GB", "GBP");
    const sign = Math.sign(transaction.value) === 1 ? "positive" : "negative";

    const html = `
    <div class="date-row">
      <div class="transaction-date">${date}</div>
    </div>
    <div class="transaction-row">
      <div class="transaction-category">${category} ${icon}</div>
      <div class="transaction-value transaction-${sign}">${value}</div>
    </div>
    `;

    transactionsContainer.insertAdjacentHTML('afterbegin', html);
  });

  transactionsContainer.insertAdjacentHTML('afterbegin', header);
};

// display transactions summary
const displaySummary = account => {
  const transactions = account.transactions;
  const totalIn = transactions.filter(transaction => transaction.value > 0).reduce((sum, transaction) => sum + transaction.value, 0);
  const totalOut = transactions.filter(transaction => transaction.value < 0).reduce((sum, transaction) => sum + Math.abs(transaction.value), 0);
  labelSummaryIn.textContent = formatCurrency(totalIn, "en-GB", "GBP");
  labelSummaryOut.textContent = formatCurrency(totalOut, "en-GB", "GBP");
};

// add transaction function
const addTransaction = (account, date, category, value) => {
  account.transactions.push({
    date: date,
    category: category,
    value: value
  });
  updateUI(account);
};

// --------------- event listeners --------------- //

// add transaction functionality
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTransaction(currentAccount, new Date(), transactionCategory.value, +transactionAmount.value);
  categoryPreset.selected = true;
  transactionAmount.value = "";
});

// --------------- graph functions --------------- //

// calculate current budget for graphs
const calcCurrBudget = account => {

  const categoryTotals = new Map();
  const accTransactions = account.transactions;

  const rent = accTransactions.filter(transaction => transaction.category === "rent").reduce((sum, transaction) => sum + Math.abs(transaction.value), 0);
  const bills = accTransactions.filter(transaction => transaction.category === "bills").reduce((sum, transaction) => sum + Math.abs(transaction.value), 0);
  const shopping = accTransactions.filter(transaction => transaction.category === "shopping").reduce((sum, transaction) => sum + Math.abs(transaction.value), 0);
  const other = accTransactions.filter(transaction => transaction.category === "other").reduce((sum, transaction) => sum + Math.abs(transaction.value), 0);

  return [rent, bills, shopping, other];
};

// return budget as array
const formatBudget = account => {
  const budget = account.budget;
  return [budget.rent, budget.bills, budget.shopping, budget.other];
};

const convertToPercentage = (value, total) => `${Math.round(100 * (value / total))}%`;


// calculate budget remaining
const calcBudgetRemaining = account => {
  const currentBudget = calcCurrBudget(account);
  const budget = formatBudget(account);

  const output = [];

  budget.forEach((category, i) => {
    output.push(category - currentBudget[i]);
  });

  return output;
};

// format balance entries over past 6 months
const formatBalanceChanges = account => {

  const generateMonth = date => formatDate(date, "en-GB", {month: "long"}).slice(0, 3);

  const balanceHistory = account.balanceHistory;

  const output = {
    balances: balanceHistory.map(bal => bal.value),
    months: balanceHistory.map(bal => generateMonth(bal.date))
  };

  output.balances.push(account.currentBalance);
  output.months.push(generateMonth(new Date()));

  return output;
};


// --------------- chartjs graphs --------------- //

let currentAccount = account1;

// current budget insight
const createCurrBudgetChart = account => {

  if (currentBudgetChart) currentBudgetChart.destroy();

  const currentBudgetData = {
    labels: [
      'Rent',
      'Bills',
      'Shopping',
      'Other'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: calcCurrBudget(account),
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
      datalabels: {
        color: 'white',
        formatter: function(value, context) {
          const dataArray = context.chart.data.datasets[0].data;
          const sum = dataArray.reduce((sum, value) => sum + value, 0);
          return convertToPercentage(value, sum);
        },
      },
      title: {
        display: true,
        text: "Current Budget Distribution",
        color: "white",
        padding: 15,
        font: {
          size: 15
        }
      }
    },
    reponsive: true,
    maintainAspectRatio: false,
  };

  const currentBudgetConfig = {
    type: 'doughnut',
    data: currentBudgetData,
    plugins: [ChartDataLabels],
    options: currentBudgetOptions
  };

  currentBudgetChart = new Chart(currBudgetCanvas, currentBudgetConfig);
}




// desired budget insight
const createDesBudgetChart = account => {

  if (desiredBudgetChart) desiredBudgetChart.destroy();

  const desiredBudgetData = {
    labels: [
      'Rent',
      'Bills',
      'Shopping',
      'Other'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: formatBudget(account),
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
      datalabels: {
        color: 'white',
        formatter: function(value, context) {
          const dataArray = context.chart.data.datasets[0].data;
          const sum = dataArray.reduce((sum, value) => sum + value, 0);
          return convertToPercentage(value, sum);
        },
      },
      title: {
        display: true,
        text: "Desired Budget Distribution",
        color: "white",
        padding: 15,
        font: {
          size: 15
        }
      },
    },
    reponsive: true,
    maintainAspectRatio: false,
  };

  const desiredBudgetConfig = {
    type: 'doughnut',
    data: desiredBudgetData,
    plugins: [ChartDataLabels],
    options: desiredBudgetOptions
  };

  desiredBudgetChart = new Chart(desiredBudgetCanvas, desiredBudgetConfig);
}




// balance change over time insight
const createBalanceChart = account => {

  if (balanceChart) balanceChart.destroy();

  const balanceChartData = {
    labels: formatBalanceChanges(account).months,
    datasets: [{
      label: 'Balance',
      data: formatBalanceChanges(account).balances,
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
        padding: 20,
        font: {
          size: 15
        }
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

  balanceChart = new Chart(balanceCanvas, balanceChartConfig);
}




// budget remaining insight
const createBudgetRemainingChart = account => {

  if (budgetRemainingChart) budgetRemainingChart.destroy();

  const budgetRemainingData = {
    labels: [
      'Rent',
      'Bills',
      'Shopping',
      'Other'
    ],
    datasets: [{
      label: 'Budget remaining',
      data: calcBudgetRemaining(account),
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
        padding: 20,
        font: {
          size: 15
        }
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

  budgetRemainingChart = new Chart(budgetRemainingCanvas, budgetRemainingConfig);
}




// graph variables
let currentBudgetChart, desiredBudgetChart, balanceChart, budgetRemainingChart;

// update UI
const updateUI = account => {
  displayBalance(account);
  displayTransactions(account);
  displaySummary(account);
  createCurrBudgetChart(account);
  createDesBudgetChart(account);
  createBalanceChart(account);
  createBudgetRemainingChart(account);
};

updateUI(currentAccount);
