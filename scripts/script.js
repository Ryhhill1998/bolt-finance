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
      date: '2022-06-03T17:21:38.602Z',
      category: "bills",
      value: -30,
    },
    {
      date: '2022-06-04T17:21:38.602Z',
      category: "bills",
      value: -60,
    },
    {
      date: '2022-06-10T17:21:38.602Z',
      category: "rent",
      value: -700,
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
      date: '2022-06-23T17:21:38.602Z',
      category: "shopping",
      value: -200,
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

  const accTransactions = account.transactions;

  transactionsContainer.innerHTML = "";
  const header = `<h2 class="section-heading">Transactions</h2>`;

  accTransactions.forEach(transaction => {

    const date = formatDate(transaction.date, "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

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

// update UI
const updateUI = account => {
  displayBalance(account);
  displayTransactions(account);
};

updateUI(account1);

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

  accTransactions.forEach(transaction => {
    const category = transaction.category;
    const value = Math.abs(transaction.value);
    if (categoryTotals.has(category)) {
      const categoryValue = categoryTotals.get(category);
      categoryTotals.set(category, categoryValue + value);
    } else {
      categoryTotals.set(category, value);
    }
  });

  const rent = categoryTotals.get("rent");
  const bills = categoryTotals.get("bills");
  const shopping = categoryTotals.get("shopping");
  const other = categoryTotals.get("other");

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

  const options = {
    month: "long",
  };

  const generateMonth = date => formatDate(date, "en-GB", options).slice(0, 3);

  const output = {
    balances: [],
    months: []
  };

  const balanceHistory = account.balanceHistory;

  balanceHistory.forEach(balance => {
    output.balances.push(balance.value);
    const month = generateMonth(balance.date);
    output.months.push(month);
  });

  const today = generateMonth(new Date());

  output.balances.push(account.currentBalance);
  output.months.push(today);

  return output;
};


// --------------- chartjs graphs --------------- //

let currentAccount = account1;

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
    data: calcCurrBudget(currentAccount),
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
    data: formatBudget(currentAccount),
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

const desiredBudgetChart = new Chart(
  document.getElementById('desired-budget-doughnut'),
  desiredBudgetConfig
);

// balance change over time insight
const balanceChartLabels = formatBalanceChanges(currentAccount).months;

const balanceChartData = {
  labels: balanceChartLabels,
  datasets: [{
    label: 'Balance',
    data: formatBalanceChanges(currentAccount).balances,
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
    label: 'Budget remaining',
    data: calcBudgetRemaining(currentAccount),
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

const budgetRemainingChart = new Chart(
  document.getElementById('budget-remaining'),
  budgetRemainingConfig
);
