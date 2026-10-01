/* Revision notes for Principles of Accounts */
window.NOTES = window.NOTES || [];
window.NOTES.push(
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Double entry',
    title: 'Debits and credits without guessing',
    body: 'Double entry rests on the dual aspect concept: every transaction has a money value and affects at least two accounts, so every debit has a matching credit of the same amount. The equation Assets = Liabilities + Capital must hold after each entry. A debit increases an asset, an expense or drawings; a credit increases a liability, capital or an income.\n\n- Owner starts the business with cash of 100,000: debit Cash 100,000, credit Capital 100,000.\n- Goods worth 50,000 bought on credit from Ade: debit Purchases 50,000, credit Ade 50,000.\n- Machinery of 250,000 bought on credit from Okonkwo: debit Machinery 250,000, credit Okonkwo 250,000. That is an asset bought on credit, not goods bought for resale.\n- Goods bought for cash 50,000: debit Purchases 50,000, credit Cash 50,000, so one asset falls while stock rises and the equation total does not move.\n- Rent paid of 6,000: debit Rent expense 6,000, credit Cash 6,000.\n- Owner takes goods worth 12,000 for personal use: debit Drawings 12,000, credit Purchases 12,000.\n\nDecide which side grows before you post. Drawings are never an expense, a credit sale debits the customer and credits Sales, and a cash sale debits Cash and credits Sales. Get one side wrong and the trial balance will not agree.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Ledger accounts',
    title: 'From prime entry to the ledger',
    body: 'The ledger is the principal book of account; it holds every personal, real and nominal account, and entries reach it by posting, which means transferring an amount from a book of prime entry to the ledger. Each posting carries a folio reference showing where the entry came from.\n\n- Credit sales go in the sales day book, cash sales in the cash book, credit purchases in the purchases day book, returns in the returns journals, and everything else in the general journal.\n- Personal accounts such as Ade or Okonkwo track amounts owed by people and firms; real accounts such as Cash and Machinery hold assets; nominal accounts such as Rent, Sales and Commission hold expenses and incomes.\n- The sales day book total is posted to the debit of the Debtors control account and the credit of Sales.\n- Cash received from a debtor is debited to Cash and credited to that debtor\'s account.\n\nBalancing off means totalling both sides of an account and carrying the difference down as balance c/d, which is then brought down as balance b/d on the opposite side. If 6,000 of rent was paid in the year, the debit side totals 6,000, the balancing figure of 6,000 is written on the credit side, and the account reopens with a debit balance of 6,000. Assets and expenses normally carry debit balances; liabilities, capital and incomes carry credit balances.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Trial balance',
    title: 'Agreeing the columns and finding errors',
    body: 'A trial balance lists every ledger balance to check the arithmetic accuracy of the books. Agreeing totals prove only that total debits equal total credits, so several errors slip through untouched.\n\n- A transaction omitted completely, such as a credit sale of 250 never entered, shortens both sides equally, so the trial balance still agrees.\n- An error of principle, like charging a repair of 400 to the shop building account, leaves the totals equal.\n- A compensating error, where two mistakes of the same size cancel out, is invisible.\n- An error of original entry, recording 500 instead of 5,000 on both sides, does not disturb the columns either.\n\nErrors that do appear are one-sided: an amount posted to one side only, an addition error in a single account, or a wrong side posting. When a credit of 500 is posted to the debit side, debits stand 500 too high and credits 500 too low, so the trial balance shows a difference of 1,000. While the columns disagree, park the difference in a suspense account; once every known error has been corrected, any balance still sitting in the suspense account proves errors remain outstanding.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Final accounts',
    title: 'Trading, profit and loss, and the balance sheet',
    body: 'Final accounts turn the year\'s transactions into a profit figure and a financial position. The trading account finds gross profit, the profit and loss account finds net profit, and the balance sheet shows what the business owns and owes at the year end.\n\nWork the trading account in order: cost of goods sold = opening stock + purchases + carriage inwards - closing stock. With opening stock of 120,000, purchases of 600,000, carriage inwards of 10,000 and closing stock of 130,000, cost of goods sold = 120,000 + 600,000 + 10,000 - 130,000 = 600,000. Sales of 800,000 less 600,000 give a gross profit of 200,000; by contrast, gross profit of 300,000 on sales of 1,000,000 is a margin of 30%. Charge expenses of 80,000 and the net profit is 120,000, which is transferred to the owner\'s capital account.\n\n- Closing stock appears twice: deducted in the trading account and added as a current asset in the balance sheet.\n- Carriage inwards belongs to the trading account; carriage outwards is a profit and loss expense.\n- Accrued expenses are current liabilities, while prepaid expenses are current assets.\n- Closing capital = opening capital + net profit - drawings, because profit raises capital and drawings reduce it.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Depreciation',
    title: 'Straight line and reducing balance',
    body: 'Depreciation is the allocation of the cost of a non-current asset over its useful life. It is not a cash payment, and the credit side of the entry goes to a provision for depreciation, a contra asset that reduces the asset in the balance sheet while the asset account itself keeps its cost.\n\n- Straight line: depreciation = (cost - residual value) / useful life. An asset of 200,000 with a scrap value of 20,000 and a five-year life gives (200,000 - 20,000) / 5 = 36,000 every year.\n- Percentage on cost: an asset of 450,000 depreciated at 10% per annum gives 450,000 x 10% = 45,000 a year, leaving a book value of 405,000 after year one.\n- Reducing balance: 200,000 at 20% gives 40,000 in year one, then (200,000 - 40,000) x 20% = 32,000 in year two, so the charge falls each year.\n- Part year: an asset of 120,000 bought on 1 July and depreciated at 10% with a 31 December year end gives 120,000 x 10% x 6/12 = 6,000.\n\nBook value = cost - accumulated depreciation. An asset costing 90,000 with accumulated depreciation of 60,000 has a book value of 30,000, so selling it for 35,000 gives a gain of 5,000, while a vehicle costing 50,000 with accumulated depreciation of 35,000 sold for 12,000 gives a loss of 3,000. Record the yearly charge with a debit to Depreciation and a credit to Provision for depreciation.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Bad debts',
    title: 'Write-offs, recoveries and provisions',
    body: 'A bad debt is a debt that will never be collected, so it is written off as an expense. Writing off 4,000 owed by Musa is a debit to Bad debts and a credit to Musa: his account is cleared and the loss lands in the profit and loss account. A debt collected after being written off is debited to Cash and credited to Bad debts recovered, which is an income.\n\n- Part payment with discount: a debtor owing 90,000 who settles at a 10% discount pays 81,000. Debit Bank 81,000 and Discount allowed 9,000, and credit his account 90,000.\n- A provision for doubtful debts estimates which of the remaining debts will go bad, so debtors are shown at their expected realisable value. Debtors of 200,000 less a 5% provision of 10,000 gives net debtors of 190,000.\n- The provision appears in the balance sheet as a deduction from debtors, never as a liability.\n- Only the movement in the provision is charged: if the required provision rises from 5,000 to 8,000, the extra 3,000 is debited to the profit and loss account; a fall is credited back to profit.\n\nKeep the two ideas apart. A bad debt is a fact and is written off in full, while a provision is an opinion about the future that is revised every year.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Control accounts',
    title: 'Checking the personal ledgers',
    body: 'Control accounts summarise the sales and purchases ledgers so that the bookkeeper can prove the individual accounts add up. The balance on the debtors control account must equal the aggregate of all individual debtor balances, and the same rule holds for creditors. Their main purpose is to check the arithmetic accuracy of the sales and purchases ledgers, not to replace them.\n\n- Debit side of Debtors control: opening balance, credit sales from the sales day book total, and interest charged.\n- Credit side of Debtors control: cash received from debtors, returns inwards, discount allowed, bad debts written off and the closing balance.\n- Credit side of Creditors control: opening balance and credit purchases from the purchases day book total.\n- Debit side of Creditors control: cash paid to suppliers, returns outwards, discount received and the closing balance.\n\nThe discount allowed total from the cash book is posted by debiting Discount allowed and crediting Debtors control, while the discount received total is posted by debiting Creditors control and crediting Discount received. A contra item arises when one person is both a debtor and a creditor and the two balances are set off; it then appears on both sides of both control accounts.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Cash book',
    title: 'Running the three-column cash book',
    body: 'The cash book is both a book of prime entry and a ledger account: it records every cash and bank transaction and doubles as the Cash account, so its balance goes straight into the trial balance. A three-column cash book carries a cash column, a bank column and discount columns on each side.\n\n- A debit balance in the bank column means money at bank; a credit balance in that column means a bank overdraft.\n- A contra entry is one that involves both the cash and bank columns, such as paying 20,000 into the bank: credit Bank 20,000 and debit Cash 20,000, marked contra in both accounts.\n- Petty cash runs on the imprest system. A float of 10,000 that has 7,500 spent on it is reimbursed by exactly 7,500, so the fund is restored to its original fixed amount of 10,000.\n- Receipts such as cash sales, money from debtors and interest allowed by the bank are debited; payments such as rent paid by standing order are credited.\n\nDiscount allowed and discount received each have their own column, and their totals post to the control accounts rather than to the cash account itself.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Bank reconciliation',
    title: 'Why the two bank balances differ',
    body: 'The cash book bank column and the bank statement should agree, but timing differences keep them apart. A bank reconciliation statement is prepared to explain the difference between the cash book balance and the bank statement balance; it never replaces the cash book, and it is the business, not the bank, that prepares it.\n\n- Cheques issued but not yet presented are already in the cash book, so deduct them from the bank statement balance to reach the cash book figure.\n- Cheques lodged but not yet credited sit only in the cash book, so deduct them from the cash book balance.\n- Bank charges shown only on the statement: debit Bank charges, credit the bank column.\n- A direct credit from a customer: debit Bank, credit that customer. Interest allowed by the bank: debit Bank, credit interest income.\n- A standing order for rent: debit Rent expense, credit Bank. A cheque returned dishonoured: debit the debtor, credit Bank.\n\nWorked examples settle it. With a cash book debit balance of 15,000 and unpresented cheques of 4,000, the statement reads 15,000 + 4,000 = 19,000. With a cash book balance of 20,000 and cheques lodged but not credited of 5,000, the statement reads 20,000 - 5,000 = 15,000. Update the cash book for every item it has missed first, then reconcile what is left.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Capital and revenue',
    title: 'Capital or revenue spending',
    body: 'Capital expenditure buys or improves a non-current asset and is shown in the balance sheet; revenue expenditure keeps the business running and is charged against profit in the profit and loss account. Misclassifying either one distorts both profit and assets, which is why examiners keep asking it.\n\n- Capital items: purchase of a delivery van, installation cost of a new machine, building an extension to the warehouse, purchase of land.\n- Revenue items: repairs to machinery, rent for the month, insurance for the year, repainting the shop, wages of part-time staff.\n- A prepaid expense is a current asset, while an accrued expense is a current liability; both exist to match costs to the period they cover.\n- A reserve is profit set aside within equity, but a provision is set aside for a specific liability whose existence is uncertain. Revenue reserves may be distributed as dividends, whereas a revaluation reserve arises from upward revaluation of non-current assets.\n\nThe rule of thumb: if the spending extends the asset\'s life or capacity it is capital, and if it merely maintains the asset at its normal condition it is revenue. Depreciation is neither a capital nor a revenue outlay; it is the yearly spread of a capital cost already incurred.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Inventories',
    title: 'Stock, mark-up and margin',
    body: 'Inventories are valued at cost, and the closing figure drives profit twice over: closing stock is deducted in the trading account and shown as a current asset in the balance sheet, so the same number appears in both places. A stock error therefore hits profit and assets in opposite directions.\n\n- Cost of goods sold = opening stock + purchases + carriage inwards - closing stock.\n- Materials consumed = opening stock of raw materials + purchases - closing stock: 80,000 + 320,000 - 60,000 = 340,000.\n- Cost of production = opening work in progress + factory costs - closing work in progress: 50,000 + 800,000 - 70,000 = 780,000, because closing work in progress is deducted in arriving at cost of goods manufactured.\n- Normal loss of materials is absorbed into the cost of good production, but an abnormal loss is charged to the profit and loss account.\n- Mark-up is always calculated on cost, margin on sales: goods costing 240,000 at a 25% mark-up sell for 240,000 x 1.25 = 300,000.\n\nKeep the cost terms apart. Prime cost is direct materials, direct labour and direct expenses, so 400,000 + 200,000 + 50,000 = 650,000; conversion cost is direct labour plus factory overheads; carriage outwards is a selling cost and never part of stock.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'note',
    topic: 'Accounting ratios',
    title: 'Margins, returns and liquidity',
    body: 'Ratios turn raw figures into comparisons, and every ratio needs a stated base. Profit margins are measured against sales, mark-up against cost, and return on capital employed against the money invested in the business. Show the working as well as the answer, because a bare number earns no mark.\n\n- Gross profit margin = gross profit / sales x 100: 300,000 / 1,000,000 = 30%.\n- Net profit margin = net profit / sales x 100: 120,000 / 800,000 = 15%.\n- Return on capital employed = net profit / capital employed x 100: 80,000 / 400,000 = 20%.\n- Current ratio = current assets / current liabilities: 300,000 / 150,000 = 2:1, and a high figure means the business can meet its short-term obligations.\n- Quick ratio = (current assets - stock - prepayments) / current liabilities: (150,000 - 40,000 - 10,000) / 100,000 = 100,000 / 100,000 = 1:1.\n- If the gross profit margin is 25% and sales are 200,000, gross profit = 25% x 200,000 = 50,000.\n\nConvert carefully: 2:1 is a stronger current position than 1.5:1, and a margin of 15% on 800,000 sales gives a net profit of 120,000, so always check that the ratio and the figures tell the same story.'
  },
  {
    subject: 'Principles of Accounts',
    type: 'sheet',
    topic: 'Debit and credit',
    title: 'Which side each account takes',
    body: '- Assets and expenses — debit\n- Liabilities, capital and income — credit\n- Drawings — debit\n- Provision for depreciation and provision for doubtful debts — credit\n- Bad debts and discount allowed — debit\n- Discount received — credit\n- Return inwards (sales returns) — debit\n- Return outwards (purchases returns) — credit\n- A debit balance in the bank column means money at bank; a credit balance means a bank overdraft\n- Contra entry — touches both the cash and the bank columns\n- Every debit must equal a credit: Assets = Liabilities + Capital, and Capital = Assets - Liabilities\n- Debtors control: credit sales go on the debit side; Creditors control: credit purchases go on the credit side\n- Net profit increases capital; drawings reduce capital\n- A prepaid expense is an asset; an accrued expense is a liability'
  },
  {
    subject: 'Principles of Accounts',
    type: 'sheet',
    topic: 'Key formulas',
    title: 'Formulas to memorise',
    body: '- Cost of goods sold = opening stock + purchases + carriage inwards - closing stock\n- Gross profit = sales - cost of goods sold\n- Net profit = gross profit - expenses\n- Gross profit margin = gross profit / sales x 100\n- Net profit margin = net profit / sales x 100\n- Mark-up is calculated on cost; margin is calculated on sales\n- Return on capital employed = net profit / capital employed x 100\n- Current ratio = current assets / current liabilities\n- Quick ratio = (current assets - stock - prepayments) / current liabilities\n- Straight line depreciation = (cost - residual value) / useful life\n- Reducing balance charge = opening book value x rate percent\n- Book value = cost - accumulated depreciation\n- Materials consumed = opening stock of materials + purchases - closing stock\n- Cost of production = opening work in progress + factory costs - closing work in progress\n- Prime cost = direct materials + direct labour + direct expenses\n- Conversion cost = direct labour + factory overheads\n- Bank statement balance = cash book balance + unpresented cheques - cheques lodged but not credited\n- Closing capital = opening capital + net profit - drawings'
  },
  {
    subject: 'Principles of Accounts',
    type: 'sheet',
    topic: 'Key definitions',
    title: 'Terms and documents to recall',
    body: '- Capital — the owner\'s claim on the assets of the business\n- Drawings — cash or goods taken by the owner for personal use\n- Bad debt — a debt that cannot be collected, written off as an expense\n- Provision — set aside for a specific liability whose existence is uncertain\n- Reserve — profit set aside within equity, not a liability to outsiders\n- Depreciation — allocation of the cost of a non-current asset over its useful life\n- Posting — transferring an entry from a book of prime entry to the ledger\n- Balancing off — totalling an account and carrying the difference down as balance c/d\n- Suspense account — opened only while the trial balance fails to agree\n- Invoice — sent by the seller, listing goods supplied and their prices\n- Receipt — issued when money is received\n- Debit note — issued by the buyer when goods are returned to a supplier\n- Pay-in-slip — used to lodge money into a bank account\n- Crossing a cheque — means it must be paid into a bank account\n- Books of prime entry — sales day book, purchases day book, returns journals, cash book, general journal\n- Cash book — a book of prime entry that is also a ledger account\n- Control account — used to check the accuracy of the sales and purchases ledgers\n- Petty cash — commonly operated on the imprest system, restored to its fixed amount\n- Capital expenditure — buys or improves a non-current asset; revenue expenditure maintains it'
  }
);
