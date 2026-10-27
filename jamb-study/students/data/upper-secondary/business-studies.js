/* Upper Secondary Business Studies — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'business-studies');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Business Basics',
    description: 'What businesses do, ownership, and markets. Draft content.',
    lessons: [{
      id: 'upper-secondary-business-studies-m1-l1',
      order: 1,
      title: 'What Is a Business?',
      objective: 'I can explain how businesses create value for customers.',
      minutes: 9,
      recap: 'You explained how businesses create value for customers.',
      blocks: [
        { type: 'text', body: 'A business supplies goods or services that customers need or want.' },
        { type: 'text', body: 'Adding value means increasing what a customer is willing to pay.' },
        { type: 'text', body: 'Profit is what remains when costs are subtracted from revenue.' },
        { type: 'tip', body: 'Name the customer before judging a business idea.' },
        {
          type: 'illustration',
          alt: 'A brown leather briefcase with a handle.',
          image: 'assets/3d/briefcase-3d.png',
          placeholder: 'Briefcase: goods, services, and value.'
        },
        { type: 'example', steps: ['Identify a customer need.', 'Choose a good or service.', 'Explain the value added.', 'Compare price with costs.'] }
      ],
      vocabulary: [
        { word: 'revenue', meaning: 'Money coming in from sales.', example: 'Revenue rose in May.' },
        { word: 'profit', meaning: 'Revenue minus total costs.', example: 'The shop made a profit.' },
        { word: 'value added', meaning: 'Extra worth created for customers.', example: 'Packaging adds value.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is profit?', options: ['Revenue minus costs', 'Total sales', 'Money borrowed'], answer: 0, why: 'Profit remains after costs.' },
        { type: 'multiple_choice', question: 'What does adding value mean?', options: ['Raising what customers pay', 'Cutting quality', 'Closing the shop'], answer: 0, why: 'Added value increases willingness to pay.' },
        { type: 'multiple_choice', question: 'What does a business supply?', options: ['Goods or services', 'Only money', 'Only ideas'], answer: 0, why: 'Businesses meet needs and wants.' }
      ]
    }, {
      id: 'upper-secondary-business-studies-m1-l2',
      order: 2,
      title: 'Ownership and Structure',
      objective: 'I can compare common forms of business ownership.',
      minutes: 9,
      recap: 'You compared common forms of business ownership.',
      blocks: [
        { type: 'text', body: 'Sole traders own and run a business alone and keep all profit.' },
        { type: 'text', body: 'Partnerships share capital and responsibility between owners.' },
        { type: 'text', body: 'Limited companies protect owners’ personal assets, while public companies sell shares on a stock market.' },
        { type: 'tip', body: 'Link each structure to its level of risk and control.' },
        {
          type: 'illustration',
          alt: 'A white classical building with stone columns.',
          image: 'assets/3d/classical_building-3d.png',
          placeholder: 'Institution: company structures and ownership.'
        },
        { type: 'example', steps: ['List three ownership forms.', 'Compare risk for each.', 'Compare access to finance.', 'Recommend one for a case.'] }
      ],
      vocabulary: [
        { word: 'liability', meaning: 'Legal responsibility for debts.', example: 'Limited liability protects owners.' },
        { word: 'shareholder', meaning: 'A person who owns shares.', example: 'Shareholders vote at meetings.' },
        { word: 'partnership', meaning: 'A business owned by two or more people.', example: 'The clinic is a partnership.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Who owns a sole trader business?', options: ['One person', 'Two partners', 'Shareholders'], answer: 0, why: 'A sole trader works alone.' },
        { type: 'multiple_choice', question: 'What does limited liability protect?', options: ['Personal assets', 'Shop stock', 'Employees’ pay'], answer: 0, why: 'Owners risk only what they invest.' },
        { type: 'multiple_choice', question: 'Where do public companies sell shares?', options: ['On a stock market', 'In a library', 'At a bank only'], answer: 0, why: 'Public shares trade on markets.' }
      ]
    }, {
      id: 'upper-secondary-business-studies-m1-l3',
      order: 3,
      title: 'Customers and Markets',
      objective: 'I can describe market demand and competition.',
      minutes: 9,
      recap: 'You described market demand and competition.',
      blocks: [
        { type: 'text', body: 'A market is where buyers and sellers trade a similar product.' },
        { type: 'text', body: 'Demand is the quantity customers will buy at a given price.' },
        { type: 'text', body: 'Competition encourages businesses to improve quality or lower prices.' },
        { type: 'tip', body: 'Watch how price changes affect demand and rivals.' },
        {
          type: 'illustration',
          alt: 'A blue bar chart with an upward arrow.',
          image: 'assets/3d/chart-increasing-3d.png',
          placeholder: 'Chart: demand, price, and competition.'
        },
        { type: 'example', steps: ['Define the market.', 'Identify customer groups.', 'Measure demand.', 'Assess two competitors.'] }
      ],
      vocabulary: [
        { word: 'demand', meaning: 'How much customers will buy.', example: 'Demand rises in summer.' },
        { word: 'competition', meaning: 'Rivals selling similar products.', example: 'Competition keeps prices low.' },
        { word: 'segment', meaning: 'A group of similar customers.', example: 'Students are a segment.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is demand?', options: ['Quantity customers will buy', 'Total profit', 'Shop rent'], answer: 0, why: 'Demand is willingness to buy.' },
        { type: 'multiple_choice', question: 'What does competition encourage?', options: ['Better quality or lower prices', 'Higher prices only', 'Fewer customers'], answer: 0, why: 'Rivals compete for customers.' },
        { type: 'multiple_choice', question: 'What is a market segment?', options: ['A group of similar customers', 'A shop shelf', 'A type of tax'], answer: 0, why: 'Segments group similar buyers.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Money and Decisions',
    description: 'Costs, marketing, and cash flow decisions. Draft content.',
    lessons: [{
      id: 'upper-secondary-business-studies-m2-l1',
      order: 1,
      title: 'Costs and Profit',
      objective: 'I can calculate total cost and profit.',
      minutes: 9,
      recap: 'You calculated total cost and profit.',
      blocks: [
        { type: 'text', body: 'Fixed costs stay similar whatever quantity is produced.' },
        { type: 'text', body: 'Variable costs rise with each unit made.' },
        { type: 'text', body: 'Profit equals revenue minus total costs.' },
        { type: 'tip', body: 'Keep fixed and variable costs in separate columns.' },
        {
          type: 'illustration',
          alt: 'A gold coin with a raised edge.',
          image: 'assets/3d/coin-3d.png',
          placeholder: 'Coin: costs, revenue, and profit.'
        },
        { type: 'example', steps: ['List fixed costs.', 'Add variable costs per unit.', 'Calculate revenue.', 'Subtract costs to find profit.'] }
      ],
      vocabulary: [
        { word: 'fixed cost', meaning: 'A cost that does not change with output.', example: 'Rent is a fixed cost.' },
        { word: 'variable cost', meaning: 'A cost that rises with output.', example: 'Packaging is a variable cost.' },
        { word: 'break-even', meaning: 'The point where revenue covers costs.', example: 'The break-even point is 200 units.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which cost stays the same?', options: ['Fixed cost', 'Variable cost', 'Unit cost'], answer: 0, why: 'Fixed costs ignore output level.' },
        { type: 'multiple_choice', question: 'How is profit found?', options: ['Revenue minus costs', 'Costs plus revenue', 'Price times units'], answer: 0, why: 'Profit is what remains after costs.' },
        { type: 'multiple_choice', question: 'What is break-even?', options: ['Revenue equals costs', 'Profit is highest', 'Sales stop'], answer: 0, why: 'At break-even there is no profit or loss.' }
      ]
    }, {
      id: 'upper-secondary-business-studies-m2-l2',
      order: 2,
      title: 'Marketing',
      objective: 'I can explain the four Ps of marketing.',
      minutes: 9,
      recap: 'You explained the four Ps of marketing.',
      blocks: [
        { type: 'text', body: 'The marketing mix covers product, price, place, and promotion.' },
        { type: 'text', body: 'Market research shows what customers want and will pay.' },
        { type: 'text', body: 'Promotion communicates value through advertising, offers, and branding.' },
        { type: 'tip', body: 'Match each P to a specific customer group.' },
        {
          type: 'illustration',
          alt: 'A white speech balloon with a blue outline.',
          image: 'assets/3d/speech-balloon-3d.png',
          placeholder: 'Speech balloon: advertising and the marketing mix.'
        },
        { type: 'example', steps: ['Describe the product.', 'Set a price.', 'Choose a sales place.', 'Plan a promotion.'] }
      ],
      vocabulary: [
        { word: 'marketing mix', meaning: 'Product, price, place, and promotion.', example: 'The marketing mix guides the plan.' },
        { word: 'promotion', meaning: 'Ways of communicating with customers.', example: 'Promotion includes adverts.' },
        { word: 'branding', meaning: 'The identity of a product.', example: 'Strong branding builds trust.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which are the four Ps?', options: ['Product, price, place, promotion', 'People, profit, plan, price', 'Product, people, profit, place'], answer: 0, why: 'These form the marketing mix.' },
        { type: 'multiple_choice', question: 'What does market research show?', options: ['What customers want', 'The weather', 'Staff holidays'], answer: 0, why: 'Research reveals customer needs.' },
        { type: 'multiple_choice', question: 'What is promotion?', options: ['Communicating with customers', 'Setting the rent', 'Hiring staff'], answer: 0, why: 'Promotion shares value and offers.' }
      ]
    }, {
      id: 'upper-secondary-business-studies-m2-l3',
      order: 3,
      title: 'Finance and Cash Flow',
      objective: 'I can explain why cash flow matters to a business.',
      minutes: 9,
      recap: 'You explained why cash flow matters to a business.',
      blocks: [
        { type: 'text', body: 'Cash flow records money coming in and going out.' },
        { type: 'text', body: 'A business can be profitable yet run short of cash.' },
        { type: 'text', body: 'Forecasting helps plan for months when outflows exceed inflows.' },
        { type: 'tip', body: 'Compare monthly inflows and outflows before spending.' },
        {
          type: 'illustration',
          alt: 'A blue bar chart with an upward arrow.',
          image: 'assets/3d/chart-increasing-3d.png',
          placeholder: 'Chart: cash coming in and going out.'
        },
        { type: 'example', steps: ['List monthly inflows.', 'List monthly outflows.', 'Find the net movement.', 'Plan for a shortfall.'] }
      ],
      vocabulary: [
        { word: 'cash flow', meaning: 'Money moving in and out.', example: 'Cash flow was tight in June.' },
        { word: 'inflow', meaning: 'Money coming into a business.', example: 'Sales are an inflow.' },
        { word: 'forecast', meaning: 'A prediction of future figures.', example: 'The cash forecast shows a gap.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does cash flow record?', options: ['Money in and out', 'Only profit', 'Only sales'], answer: 0, why: 'Cash flow tracks movements of money.' },
        { type: 'multiple_choice', question: 'Can a profitable business run short of cash?', options: ['Yes', 'No', 'Only in winter'], answer: 0, why: 'Timing of payments can create gaps.' },
        { type: 'multiple_choice', question: 'What is an inflow?', options: ['Money coming in', 'Money going out', 'A type of loan'], answer: 0, why: 'Inflows are receipts of money.' }
      ]
    }]
  }];
}());
