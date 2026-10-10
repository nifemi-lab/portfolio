/* Maths Dojo content — teaching notes per syllabus topic and step-by-step
   explanations per question. LESSONS keys are the exact question text from
   the bank (run tools/check-dojo-data.js after any bank or content edit). */
window.LESSON_NOTES = window.LESSON_NOTES || {};
window.LESSON_NOTES['Mathematics'] = {
  'Number bases': {
    note: '<p>A base is how many digits a counting system uses before it rolls over. Base 10 uses 0-9. Base 2 (binary) uses only 0 and 1. Base 4 uses 0-3 - so a digit like <code>7</code> would be illegal there.</p><p>To convert to base 10, expand by powers: multiply each digit by the base raised to its position, then add. E.g. <code>1011<sub>2</sub></code> = 1&times;2<sup>3</sup> + 0&times;2<sup>2</sup> + 1&times;2<sup>1</sup> + 1&times;2<sup>0</sup>.</p>',
    example: {
      title: 'Convert 1011 base 2 to base 10',
      steps: [
        'Write the place values above the digits: 2<sup>3</sup> 2<sup>2</sup> 2<sup>1</sup> 2<sup>0</sup>.',
        'Multiply each digit by its place value: 1&times;2<sup>3</sup> = 8, 0&times;2<sup>2</sup> = 0, 1&times;2<sup>1</sup> = 2, 1&times;2<sup>0</sup> = 1.',
        'Add the results: 8 + 0 + 2 + 1 = <b>11</b>. So 1011<sub>2</sub> = 11 in base 10.'
      ]
    }
  },
  'Fractions & decimals': {
    note: '<p>Fractions add and subtract only when the pieces are the same size - rewrite both with a common denominator (the LCM of the bottoms), then work with the tops. To divide, flip the second fraction and multiply.</p><p>The HCF is the largest number that divides into all the numbers; the LCM is the smallest number all of them divide into. Decimals are just fractions over 10, 100, 1000 - reduce them the same way.</p>',
    example: {
      title: 'Simplify: 1/2 + 1/3',
      steps: [
        'Common denominator: the LCM of 2 and 3 is 6.',
        'Rewrite both: 1/2 = 3/6 and 1/3 = 2/6.',
        'Add the tops: 3/6 + 2/6 = <b>5/6</b>.'
      ]
    }
  },
  'Indices': {
    note: '<p>A power is shorthand for repeated multiplication: 2<sup>4</sup> means 2 &times; 2 &times; 2 &times; 2. Same base? Multiply by adding the indices, divide by subtracting them, and a power of a power multiplies them.</p><p>Index 0 gives 1 for any base, and a negative index flips the number: 2<sup>-3</sup> = 1/2<sup>3</sup>.</p>',
    example: {
      title: 'Simplify: 2^3 x 2^4',
      steps: [
        'Same base 2, so add the indices: 3 + 4 = 7.',
        '2<sup>7</sup> = 128.',
        'So 2<sup>3</sup> &times; 2<sup>4</sup> = <b>128</b>.'
      ]
    }
  },
  'Logarithms': {
    note: '<p>A logarithm asks one question: <em>what power?</em> log<sub>2</sub> 32 is the power you raise 2 to in order to get 32 - and since 2<sup>5</sup> = 32, log<sub>2</sub> 32 = 5.</p><p>Logs of a product add (log MN = log M + log N), and a power slides down in front: log M<sup>k</sup> = k log M. Those two rules crack most exam questions.</p>',
    example: {
      title: 'Evaluate: log base 2 of 32',
      steps: [
        'Ask: 2 to what power gives 32?',
        '2<sup>5</sup> = 32 (2, 4, 8, 16, 32 - five doublings).',
        'So log<sub>2</sub> 32 = <b>5</b>.'
      ]
    }
  },
  'Sets': {
    note: '<p>A set is just a collection of things. The exam staple is two overlapping groups: anyone in <em>both</em> sits inside both circles, so a plain sum counts them twice.</p><p>Fix it with the union formula: n(A &cup; B) = n(A) + n(B) - n(A &cap; B) - add the two groups, subtract the overlap once. If the question mentions who is in <em>neither</em> group, subtract that from the total first.</p>',
    example: {
      title: 'History 18, Geography 12, both 5 - how many take at least one?',
      steps: [
        'Add the two groups: 18 + 12 = 30.',
        'Subtract the overlap once: 30 - 5 = 25.',
        'So <b>25</b> students take at least one of the subjects.'
      ]
    }
  },
  'Quadratic equations': {
    note: '<p>A quadratic equation has x<sup>2</sup> as its highest power. Put it in the form ax<sup>2</sup> + bx + c = 0, then factorise: find two numbers that multiply to c and add to b, and write the brackets.</p><p>The <em>roots</em> are the values that make each bracket zero - set each bracket to zero and solve. Watch the special shapes: a difference of two squares x<sup>2</sup> - k<sup>2</sup> = (x - k)(x + k), and equations like x<sup>2</sup> = 49 that have <b>two</b> roots, +7 and -7.</p>',
    example: {
      title: 'Factorise: x^2 - 9',
      steps: [
        'Spot the difference of two squares: x<sup>2</sup> - 3<sup>2</sup>.',
        'Apply a<sup>2</sup> - b<sup>2</sup> = (a - b)(a + b).',
        'x<sup>2</sup> - 9 = <b>(x - 3)(x + 3)</b>.'
      ]
    }
  },
  'Simultaneous equations': {
    note: '<p>Two equations, two unknowns. The fast road is <em>elimination</em>: if one unknown has opposite signs in the two equations, add them - it disappears, leaving one equation in one unknown.</p><p>Then substitute back to get the second unknown, and always test your pair in the equation you did not use.</p>',
    example: {
      title: 'Solve x + y = 10 and x - y = 4',
      steps: [
        'The y-terms are +y and -y, so add the two equations.',
        '2x = 14, so x = 7.',
        'Substitute back: 7 + y = 10 gives y = 3. So <b>x = 7, y = 3</b>.'
      ]
    }
  },
  'Probability': {
    note: '<p>Probability is a fraction: favourable outcomes divided by total equally likely outcomes. A fair die has 6 equally likely faces; a fair coin has 2.</p><p>Two shortcuts cover most questions: P(not A) = 1 - P(A), and for two independent events both happening, multiply their separate probabilities. When in doubt, list the outcomes - the lists are short.</p>',
    example: {
      title: 'A fair die is thrown - probability of a 6',
      steps: [
        'Total outcomes: 6 faces.',
        'Favourable: one face, the 6.',
        'P = <b>1/6</b>.'
      ]
    }
  },
  'Ratios & identities': {
    note: '<p>In a right-angled triangle the three ratios answer to SOH-CAH-TOA: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent.</p><p>Learn the standard values at 30&deg;, 45&deg; and 60&deg; cold - sin 30&deg; = 1/2 and tan 45&deg; = 1 for a start - and remember the identity sin<sup>2</sup>&theta; + cos<sup>2</sup>&theta; = 1, which is just Pythagoras in disguise.</p>',
    example: {
      title: 'sin theta = 3/5 - find cos theta',
      steps: [
        'sin = opposite/hypotenuse = 3/5, so the opposite side is 3 and the hypotenuse is 5.',
        'Third side by Pythagoras: &radic;(5<sup>2</sup> - 3<sup>2</sup>) = &radic;16 = 4.',
        'cos = adjacent/hypotenuse = <b>4/5</b>.'
      ]
    }
  },
  'Permutations & combinations': {
    note: '<p>Both count groups; the difference is order. <b>P</b>ermutations count arrangements - order matters, so AB and BA are different. <b>C</b>ombinations count selections - order is ignored, so AB and BA are the same pick.</p><p>nPr = n &times; (n - 1) &times; ... for r factors; nCr = nPr &divide; r!. With words, a factorial counts the arrangements of distinct letters: 4! = 24 for MATH.</p>',
    example: {
      title: 'Evaluate: 5P2 and 6C2',
      steps: [
        '5P2: two slots - 5 choices, then 4 left, so 5 &times; 4 = <b>20</b>.',
        '6C2: first 6P2 = 30, then divide the order out: 30 &divide; 2! = <b>15</b>.',
        'For the same n and r, the P answer is the bigger number - order adds arrangements.'
      ]
    }
  },
  'Differentiation': {
    note: '<p>The derivative measures <em>rate of change</em> - how fast y moves when x moves. For a power of x the rule is: <b>multiply by the index, then knock the index down by 1</b>. So x<sup>3</sup> becomes 3x<sup>2</sup>, and a plain constant differentiates to 0.</p><p>Everything else is that rule plus bookkeeping: a constant multiplier rides along (5x<sup>2</sup> becomes 10x), a bracket needs the chain rule (differentiate outside, then multiply by the derivative of the inside), and fractions like 1/x<sup>2</sup> are easier rewritten as x<sup>-2</sup> first.</p>',
    example: {
      title: 'Differentiate: y = x^3',
      steps: [
        'Bring the index down in front: 3x<sup>3 - 1</sup>.',
        'Reduce the index by 1: 3x<sup>2</sup>.',
        'So the derivative of x<sup>3</sup> is <b>3x<sup>2</sup></b>.'
      ]
    }
  },
  'Integration': {
    note: '<p>Integration is differentiation run backwards: <b>raise the index by 1, then divide by the new index</b> - the exact opposite of the power rule. Always add <b>+ C</b> for an indefinite integral: every constant differentiates to 0, so any of them could have been hiding there.</p><p>A <em>definite</em> integral has limits: integrate, then work out (top limit) minus (bottom limit). That value is the area under the curve - and it is also how velocity turns back into distance.</p>',
    example: {
      title: 'Integrate x^3 with respect to x',
      steps: [
        'Raise the index by 1: x<sup>4</sup>.',
        'Divide by the new index: x<sup>4</sup>/4.',
        'Add the constant: <b>x<sup>4</sup>/4 + C</b>.'
      ]
    }
  },
  'Applications of calculus': {
    note: '<p>Two big jobs. First, <b>rates and motion</b>: differentiating displacement gives velocity, differentiating again gives acceleration; integrating velocity brings distance back. "At rest" is calculus for v = 0 - the same condition marks the top of a throw.</p><p>Second, <b>turning points</b>: a maximum or minimum sits where dy/dx = 0. Solve it, then tell them apart with the second derivative - positive means a minimum (valley), negative means a maximum (hill). The tangent gradient at a point is just dy/dx evaluated there; the normal is perpendicular, so flip the fraction and change the sign.</p>',
    example: {
      title: 'Find the minimum value of y = x^2 - 4x + 7',
      steps: [
        'dy/dx = 2x - 4. Set it to 0: x = 2.',
        'Second derivative is 2, which is positive - a minimum.',
        'Substitute x = 2 back: y = 4 - 8 + 7 = <b>3</b>.'
      ]
    }
  },
  'Curves & equations': {
    note: '<p>Curves in coordinate geometry come in two exam flavours. <b>Circles</b>: the standard form (x - a)<sup>2</sup> + (y - b)<sup>2</sup> = r<sup>2</sup> shows centre (a, b) and radius r directly - and the expanded form x<sup>2</sup> + y<sup>2</sup> + ... hides them, so complete the square to get them back.</p><p><b>Parabolas</b> y = ax<sup>2</sup> + bx + c: the line of symmetry is x = -b/(2a). To find where a line meets a curve, set the two expressions equal and solve - the solutions are the x-coordinates of the meeting points.</p>',
    example: {
      title: 'Find the radius of the circle x^2 + y^2 - 8x + 6y + 21 = 0',
      steps: [
        'Complete the square in x and y: (x - 4)<sup>2</sup> + (y + 3)<sup>2</sup> = 4.',
        'Compare with (x - a)<sup>2</sup> + (y - b)<sup>2</sup> = r<sup>2</sup>.',
        'r<sup>2</sup> = 4, so the radius is <b>2</b>.'
      ]
    }
  },
  'Trigonometric graphs': {
    note: '<p>For y = sin kx or cos kx: the <b>period</b> (one full wave) is 360/k degrees, and the <b>amplitude</b> (half the total height) is the number in front. sin and cos live between -1 and 1; the graph of tan x repeats every 180 degrees and shoots off to infinity wherever cos x = 0.</p><p>To count solutions of sin x = a between 0 and 360, think quadrants: a positive sine gives two angles (x and 180 - x), and a positive cosine gives two as well (x and 360 - x).</p>',
    example: {
      title: 'How many solutions does sin x = 1/2 have between 0 and 360?',
      steps: [
        'First quadrant: x = 30 degrees.',
        'Second quadrant: x = 180 - 30 = 150 degrees.',
        'The wave cuts the line twice, so <b>2</b> solutions.'
      ]
    }
  },
  'Constructions & locus': {
    note: '<p>A locus is the full path a point makes under a rule - and JAMB tests four classic ones. Equidistant from two <b>points</b>: the perpendicular bisector. Equidistant from two <b>lines</b>: the angle bisector. Fixed distance from a <b>point</b>: a circle. Fixed distance from a <b>line</b>: a pair of parallel lines, one on each side.</p><p>Constructions are compass-and-ruler recipes: arcs from the two ends of AB cross to build the perpendicular bisector, an arc from the vertex starts an angle bisector, and a regular hexagon steps around its circle with the compasses set to the radius.</p>',
    example: {
      title: 'The locus of a point at a constant distance d from a fixed line',
      steps: [
        'All points d above the line: one parallel line.',
        'All points d below it: another parallel line.',
        'Locus: <b>a pair of parallel lines, one on each side</b>.'
      ]
    }
  },
  'Data presentation': {
    note: '<p>Charts are chosen by the kind of data: a <b>pie chart</b> shows parts of a whole (sector angle = value/total &times; 360), a <b>bar chart</b> compares frequencies (bar height = frequency), and a <b>histogram</b> handles grouped continuous data - class intervals on the axis and no gaps between the bars.</p><p>The <b>cumulative frequency curve</b> (ogive) adds frequencies class by class; the median is read at half the total frequency. The class mark of a group is its midpoint - average the two ends.</p>',
    example: {
      title: 'A 60-degree pie sector represents 120 students. The total is:',
      steps: [
        '60/360 = 1/6 of the chart.',
        '120 students = 1/6 of the total.',
        'Total = 120 &times; 6 = <b>720</b>.'
      ]
    }
  },
  'Transformations': {
    note: '<p>Four moves change a shape: <b>translation</b> (slide by a vector), <b>reflection</b> (mirror in a line), <b>rotation</b> (turn about a point) and <b>enlargement</b> (scale by a factor). Coordinate rules worth knowing: reflection in the x-axis sends (x, y) to (x, -y); reflection in y = x swaps to (y, x); a 180-degree turn negates both. A 90-degree anticlockwise turn sends (x, y) to (-y, x).</p><p>Under an enlargement by factor k, lengths multiply by k but <b>areas multiply by k<sup>2</sup></b>.</p>',
    example: {
      title: 'Enlargement factor 2 turns an area of 6 cm^2 into:',
      steps: [
        'Area factor = k<sup>2</sup> = 2<sup>2</sup> = 4.',
        '6 &times; 4 = 24.',
        'New area = <b>24 cm<sup>2</sup></b>.'
      ]
    }
  }
};

window.LESSONS = window.LESSONS || {};
window.LESSONS['Mathematics'] = {

  /* ----- Number bases ----- */
  'Convert 1011 base 2 to base 10.': {
    idea: 'In base 2, every column is worth double the one before it, reading right to left: 1, 2, 4, 8... Each digit says how many of that column to keep. So converting to base 10 is just: multiply each digit by its column, then add.',
    steps: [
      'Write the columns under the digits, right to left: <code>1 0 1 1</code> &rarr; <code>8 4 2 1</code>.',
      'Multiply each digit by its column: 1&times;8 = 8 &middot; 0&times;4 = 0 &middot; 1&times;2 = 2 &middot; 1&times;1 = 1.',
      'Add the results: 8 + 0 + 2 + 1 = <b>11</b> - option D.'
    ],
    board: [
      '1011<sub>2</sub> = 1&times;2<sup>3</sup> + 0&times;2<sup>2</sup> + 1&times;2<sup>1</sup> + 1&times;2<sup>0</sup>',
      '      = 8 + 0 + 2 + 1',
      '      = 11'
    ],
    trap: 'Option C (10) is waiting if you drop the last column: 8 + 0 + 2 = 10. The rightmost digit is worth 2<sup>0</sup> = 1, never nothing.'
  },
  'Convert 45 base 10 to base 2.': {
    idea: 'Going the other way: split the number into powers of two, biggest first - 32, 16, 8, 4, 2, 1. Every power you can take becomes a 1, every power you skip becomes a 0.',
    steps: [
      'List the powers of 2 up to 45: <code>32 16 8 4 2 1</code>.',
      'Take the biggest that fits each time: 45 - 32 = 13 &middot; 13 - 8 = 5 &middot; 5 - 4 = 1 &middot; 1 - 1 = 0.',
      'Taken powers &rarr; 1, skipped &rarr; 0: <code>1 0 1 1 0 1</code> = <b>101101</b> - option A.'
    ],
    board: [
      '45 = 32 + 8 + 4 + 1',
      '   = 1&times;2<sup>5</sup> + 0&times;2<sup>4</sup> + 1&times;2<sup>3</sup> + 1&times;2<sup>2</sup> + 0&times;2<sup>1</sup> + 1&times;2<sup>0</sup>',
      '   = 101101<sub>2</sub>'
    ],
    trap: 'Option B (101001 = 41) is the "forgot the 4" answer: 32 + 8 + 1. After 13 - 8 = 5, the biggest power that still fits is 4 - always re-check the remainder against the full list.'
  },
  'Convert 10110 base 2 to base 10.': {
    idea: 'Same column method as any base-2 reading: five columns here, worth 16, 8, 4, 2 and 1 from left to right. Multiply each digit by its column and add.',
    steps: [
      'Write the columns: <code>16 8 4 2 1</code> under <code>1 0 1 1 0</code>.',
      'Multiply: 1&times;16 = 16 &middot; 0&times;8 = 0 &middot; 1&times;4 = 4 &middot; 1&times;2 = 2 &middot; 0&times;1 = 0.',
      'Add: 16 + 0 + 4 + 2 + 0 = <b>22</b> - option C.'
    ],
    board: [
      '10110<sub>2</sub> = 1&times;2<sup>4</sup> + 0&times;2<sup>3</sup> + 1&times;2<sup>2</sup> + 1&times;2<sup>1</sup> + 0&times;2<sup>0</sup>',
      '       = 16 + 0 + 4 + 2 + 0',
      '       = 22'
    ],
    trap: 'Option A (20) drops the 2-column: 16 + 4 = 20. Every 1 in the number must be paid its column - there are three 1s here, not two. The 0s each take a column too, they are just worth nothing.'
  },
  'Convert 54 base 10 to base 4.': {
    idea: 'For base 10 going down to a small base, divide repeatedly by the base and collect the remainders. Read them from the bottom up - the last remainder is the leading digit.',
    steps: [
      'Divide 54 by 4: 54 = 13 &times; 4 + 2, remainder 2.',
      'Divide 13 by 4: 13 = 3 &times; 4 + 1, remainder 1.',
      'Divide 3 by 4: 3 = 0 &times; 4 + 3, remainder 3. Read the remainders upwards: <b>312</b> - option A.'
    ],
    board: [
      '54 &divide; 4 = 13 r 2',
      '13 &divide; 4 =  3 r 1',
      ' 3 &divide; 4 =  0 r 3',
      'read up &rarr; 312<sub>4</sub>'
    ],
    trap: 'Option B (321) is 312 read the wrong way - remainders travel upwards (last one first). Option C (132) starts with the wrong digit: the first digit of the answer is always the final remainder, 3 here.'
  },

  /* ----- Fractions & decimals ----- */
  'Simplify: 1/2 + 1/3.': {
    idea: 'Fractions can only be added when the pieces are the same size. Find a common denominator (the LCM of the bottoms), rewrite both fractions over it, then add the tops only.',
    steps: [
      'The lowest common denominator of 2 and 3 is 6.',
      'Rewrite both: 1/2 = 3/6 and 1/3 = 2/6.',
      'Add the tops: 3/6 + 2/6 = <b>5/6</b> - option B.'
    ],
    board: [
      '1/2 + 1/3',
      '= 3/6 + 2/6',
      '= 5/6'
    ],
    trap: 'Option A (2/5) is the classic "adding across" slip: 1 + 1 over 2 + 3. Denominators are never added - they must be made equal first, and only the tops get added.'
  },
  'Find the HCF of 12, 18 and 24.': {
    idea: 'The HCF is the largest number that divides exactly into all of them. Break the numbers into prime factors and keep the highest power that every number shares.',
    steps: [
      'Prime factors: 12 = 2<sup>2</sup> &times; 3, 18 = 2 &times; 3<sup>2</sup>, 24 = 2<sup>3</sup> &times; 3.',
      'Shared primes at their lowest powers: 2 and 3.',
      '2 &times; 3 = <b>6</b> - option C.'
    ],
    board: [
      '12 = 2<sup>2</sup> &times; 3',
      '18 = 2 &times; 3<sup>2</sup>',
      '24 = 2<sup>3</sup> &times; 3',
      'share: 2 &times; 3 = 6'
    ],
    trap: 'Option D (12) is the biggest <b>number</b>, not the biggest common factor - 12 does not divide into 18. Option B (3) stops early: 2 is also shared by all three, so the answer is 2 &times; 3 = 6.'
  },
  'Find the LCM of 4, 6 and 8.': {
    idea: 'The LCM is the smallest number that all of them divide into. Take the highest power of every prime that appears in any of the numbers.',
    steps: [
      'Prime factors: 4 = 2<sup>2</sup>, 6 = 2 &times; 3, 8 = 2<sup>3</sup>.',
      'Highest powers: 2<sup>3</sup> and 3.',
      '2<sup>3</sup> &times; 3 = <b>24</b> - option A.'
    ],
    board: [
      ' 4 = 2<sup>2</sup>',
      ' 6 = 2 &times; 3',
      ' 8 = 2<sup>3</sup>',
      'LCM = 2<sup>3</sup> &times; 3 = 24'
    ],
    trap: 'Option B (12) is not a multiple of 8, so it cannot be the LCM. Option C (48) is a common multiple but not the <b>lowest</b> - the question asks for the smallest, and 24 already works for all three.'
  },
  'Express 0.125 as a fraction in its lowest terms.': {
    idea: 'A decimal is a fraction with a power of 10 on the bottom: count the decimal places - one place is tenths, two is hundredths, three is thousandths. Then reduce by cancelling common factors.',
    steps: [
      '0.125 has 3 decimal places, so it is 125/1000.',
      'Cancel: divide top and bottom by 25 to get 5/40.',
      'Divide by 5 again: <b>1/8</b> - option C.'
    ],
    board: [
      '0.125 = 125/1000',
      '      = 5/40',
      '      = 1/8'
    ],
    trap: 'Option A (1/4) is the near miss: 1 &divide; 4 = 0.25, double 0.125. Always verify the last step - 1 &divide; 8 = 0.125 exactly.'
  },

  /* ----- Indices ----- */
  'Simplify: 2^3 x 2^4.': {
    idea: 'Same base, multiplied: the indices add. 2<sup>3</sup> is three 2s multiplied, 2<sup>4</sup> is four more - together that is seven 2s, so 2<sup>7</sup>.',
    steps: [
      'Same base (2), so add the indices: 3 + 4 = 7.',
      '2<sup>7</sup> = 128.',
      '<b>128</b> - option D.'
    ],
    board: [
      '2<sup>3</sup> &times; 2<sup>4</sup> = 2<sup>3+4</sup> = 2<sup>7</sup>',
      '2<sup>7</sup> = 128'
    ],
    trap: 'Multiplying the indices (3 &times; 4) is the rule for a <b>power of a power</b> like (2<sup>3</sup>)<sup>4</sup>. This is a plain product, so the indices add: 2<sup>7</sup> = 128, not 2<sup>12</sup> (which is 4096, far off every option).'
  },
  'Simplify: x^5 / x^2.': {
    idea: 'Same base, divided: the indices subtract. Top has five x\'s, bottom has two - two of them cancel, three remain.',
    steps: [
      'Same base x, so subtract the indices: 5 - 2 = 3.',
      '<b>x<sup>3</sup></b> - option B.',
      'Sanity check by cancelling: x&middot;x&middot;x&middot;x&middot;x top, x&middot;x bottom - two pairs cancel, three x\'s left.'
    ],
    board: [
      'x<sup>5</sup> &divide; x<sup>2</sup> = x<sup>5-2</sup>',
      '        = x<sup>3</sup>'
    ],
    trap: 'Option A (x<sup>7</sup>) adds the indices - that is the rule for <b>multiplying</b>. Option C (x<sup>10</sup>) multiplies them. Division always subtracts.'
  },
  'Evaluate: 1/(2^-3).': {
    idea: 'A negative index means "flip it": 2<sup>-3</sup> = 1/2<sup>3</sup>. So one over a negative power flips it back to a plain positive power.',
    steps: [
      '2<sup>-3</sup> = 1/2<sup>3</sup>, so 1/(2<sup>-3</sup>) = 2<sup>3</sup>.',
      '2<sup>3</sup> = 8.',
      '<b>8</b> - option C.'
    ],
    board: [
      '1/2<sup>-3</sup> = 2<sup>3</sup>',
      '2<sup>3</sup> = 8'
    ],
    trap: 'Option A (-8) reads the minus as a sign of the answer - a negative index flips the fraction, it never makes the value negative. Option B (1/8) stops at 2<sup>-3</sup> and forgets the outer division flips it back.'
  },
  'Express 32 as a power of 2.': {
    idea: 'Count how many 2s multiply together to give 32 - keep halving and count the steps.',
    steps: [
      'Halve repeatedly: 32 &rarr; 16 &rarr; 8 &rarr; 4 &rarr; 2 &rarr; 1.',
      'That is five halvings, so five 2s multiplied.',
      '32 = <b>2<sup>5</sup></b> - option B.'
    ],
    board: [
      '32 = 2 &times; 16',
      '   = 2 &times; 2 &times; 8',
      '   = 2 &times; 2 &times; 2 &times; 2 &times; 2',
      '   = 2<sup>5</sup>'
    ],
    trap: 'Option A (2<sup>4</sup>) is one factor short - 2<sup>4</sup> = 16, only halfway. Option C (2<sup>6</sup> = 64) overshoots. Count the 2s, not the digits of 32.'
  },

  /* ----- Logarithms ----- */
  'Evaluate: log base 2 of 32.': {
    idea: 'A log asks one question: <em>what power?</em> log<sub>2</sub> 32 means "2 raised to what gives 32?" - so chase the doublings until you land on 32 and count them.',
    steps: [
      'Ask: 2 to <b>what power</b> gives 32?',
      '2<sup>5</sup> = 32 (2, 4, 8, 16, 32 - five steps).',
      'So log<sub>2</sub> 32 = <b>5</b> - option D.'
    ],
    board: [
      'log<sub>2</sub> 32 = ?',
      '2<sup>5</sup> = 32',
      'log<sub>2</sub> 32 = 5'
    ],
    trap: 'Option B (4) stops the doubling chain at 16; option C (6) overshoots to 64. Chase the chain all the way to 32 and count the arrows - five.'
  },
  'If log base 10 of x = 2, find x.': {
    idea: 'Turn the log back into a power: log<sub>10</sub> x = 2 means "10 to the power 2 gives x". The log\'s value <em>is</em> the index.',
    steps: [
      'log<sub>10</sub> x = 2 &rarr; 10<sup>2</sup> = x.',
      '10<sup>2</sup> = 100.',
      '<b>100</b> - option C.'
    ],
    board: [
      'log<sub>10</sub> x = 2',
      '10<sup>2</sup> = x',
      'x = 100'
    ],
    trap: 'Option B (20) multiplies by 10 once instead of squaring; option D (1000) is 10<sup>3</sup>, one power too far. Raise 10 to the log\'s value: 10<sup>2</sup> = 100.'
  },
  'Simplify: log 100 + log 10.': {
    idea: 'Two routes, same answer: evaluate each log separately then add, or use the product rule (log M + log N = log MN). Both are worth seeing once.',
    steps: [
      'log 100 = 2 (since 10<sup>2</sup> = 100) and log 10 = 1.',
      'Add: 2 + 1 = <b>3</b> - option A.',
      'Product-rule check: log(100 &times; 10) = log 1000 = 3. Same answer.'
    ],
    board: [
      'log 100 = 2',
      'log 10  = 1',
      '2 + 1 = 3'
    ],
    trap: 'Option B (2) keeps only the first log; option D (1) is just log 10. When logs add, their <b>values</b> add - 2 + 1, not 2 &times; 1.'
  },
  'Given that log 2 = 0.3010, find log 8.': {
    idea: 'Write 8 as a power of 2 first (8 = 2<sup>3</sup>), then slide the index in front: log 2<sup>3</sup> = 3 log 2. A multiplication you can do with the given decimal.',
    steps: [
      'Write 8 as a power: 8 = 2<sup>3</sup>.',
      'Power rule: log 8 = 3 &times; log 2.',
      '3 &times; 0.3010 = <b>0.9030</b> - option D.'
    ],
    board: [
      'log 8 = log 2<sup>3</sup>',
      '      = 3 &times; log 2',
      '      = 3 &times; 0.3010 = 0.9030'
    ],
    trap: 'Option A (0.6020) is 2 &times; 0.3010 - it uses 8 = 2<sup>2</sup>-thinking (that would be 4). Option C (1.2040) is 4 logs. Count the factors of 2 inside 8: three of them.'
  },

  /* ----- Sets ----- */
  'In a class, 18 students take History, 12 take Geography and 5 take both. How many take at least one of the two subjects?': {
    idea: 'Everyone who takes <em>both</em> sits inside both groups, so adding the groups counts them twice. Add, then subtract the overlap once: n(A &cup; B) = n(A) + n(B) - n(A &cap; B).',
    steps: [
      'Raw sum: 18 + 12 = 30.',
      'The 5 who take both were counted twice - subtract them once: 30 - 5 = 25.',
      '<b>25</b> students take at least one - option B.'
    ],
    board: [
      'n(H &cup; G) = n(H) + n(G) - n(H &cap; G)',
      '        = 18 + 12 - 5',
      '        = 25'
    ],
    trap: 'Option C (30) is the raw sum - the 5 "both" students appear in the 18 <b>and</b> the 12. Option A (23) subtracts too much. Subtract the overlap exactly once.'
  },
  'In a survey of 200 students, 120 like football and 90 like basketball. If every student likes at least one of the games, how many like both?': {
    idea: '"Every student likes at least one" means the two groups together fill all 200 - so the raw sum 120 + 90 over-counts, and the excess is exactly the "both" group.',
    steps: [
      'Raw sum: 120 + 90 = 210.',
      'The count is 10 more than the 200 students - those 10 were counted twice.',
      '<b>10</b> like both - option D.'
    ],
    board: [
      '120 + 90 = 210',
      '210 - 200 = 10',
      'both = 10'
    ],
    trap: 'Test any candidate by putting it back: with 20 (option A), 120 + 90 - 20 = 190 - ten students unaccounted for, but every student likes at least one game. The double count must be exactly 210 - 200 = 10.'
  },
  'In a class of 40 students, 25 offer Physics, 18 offer Chemistry and 5 offer neither. How many offer both subjects?': {
    idea: 'The "neither" group sits outside both circles - remove it from the total first. The 35 left offer at least one subject, and the raw sum of Physics and Chemistry over-counts the overlap.',
    steps: [
      'At least one subject: 40 - 5 = 35.',
      'Raw sum: 25 + 18 = 43 - which is 8 more than 35.',
      'The 8 extra are the double-counted "both" students: <b>8</b> - option C.'
    ],
    board: [
      'at least one = 40 - 5 = 35',
      'both = 25 + 18 - 35',
      '     = 43 - 35 = 8'
    ],
    trap: 'Option A (5) just repeats the "neither" number - that group is outside both circles and can never be the overlap. Work with 35 inside the circles, not the whole 40.'
  },

  /* ----- Quadratic equations ----- */
  'Factorise: x^2 - 9.': {
    idea: 'Spot the shape: x<sup>2</sup> - 9 is x<sup>2</sup> - 3<sup>2</sup>, a difference of two squares. The pattern a<sup>2</sup> - b<sup>2</sup> = (a - b)(a + b) opens it instantly.',
    steps: [
      'Match the pattern: a = x, b = 3.',
      'Apply a<sup>2</sup> - b<sup>2</sup> = (a - b)(a + b).',
      'x<sup>2</sup> - 9 = <b>(x - 3)(x + 3)</b> - option B.'
    ],
    board: [
      'x<sup>2</sup> - 9 = x<sup>2</sup> - 3<sup>2</sup>',
      '        = (x - 3)(x + 3)'
    ],
    trap: 'Option A ((x - 3)<sup>2</sup>) expands to x<sup>2</sup> - 6x + 9 - the -6x middle term gives it away. Here the x-terms cancel: -3x + 3x = 0, so there is no middle term.'
  },
  'The roots of the equation x^2 - 5x + 6 = 0 are:': {
    idea: 'To factorise x<sup>2</sup> + bx + c, find two numbers that multiply to c and add to b - here, product +6 and sum -5. The roots are then the values that zero each bracket.',
    steps: [
      'Two numbers with product 6 and sum -5: -2 and -3.',
      'x<sup>2</sup> - 5x + 6 = (x - 2)(x - 3) = 0.',
      'x = 2 or x = 3 - <b>2 and 3</b> - option B.'
    ],
    board: [
      'x<sup>2</sup> - 5x + 6 = (x - 2)(x - 3)',
      'x - 2 = 0 &rarr; x = 2',
      'x - 3 = 0 &rarr; x = 3'
    ],
    trap: 'Option C (both negative) flips the sign: (x + 2)(x + 3) expands to +5x in the middle, but the question has -5x. Option A (1 and 6) checks the product only - 1 + 6 = 7, not 5.'
  },
  'Solve the equation: x^2 = 49. Find all the possible values of x.': {
    idea: 'Two different numbers square to 49: a positive one and a negative one, because two negatives multiply to a positive. "Find all the possible values" is the question telling you both exist.',
    steps: [
      'Take square roots of both sides: x = &plusmn;&radic;49.',
      '7 &times; 7 = 49 and (-7) &times; (-7) = 49.',
      '<b>x = 7 or x = -7</b> - option D.'
    ],
    board: [
      'x<sup>2</sup> = 49',
      'x = &plusmn;&radic;49',
      'x = 7 or x = -7'
    ],
    trap: 'Option A (7 only) drops the negative root. When the question says "all the possible values", the negative solution is half the marks - write both.'
  },
  'Find the quadratic equation whose roots are 2 and -5.': {
    idea: 'Build the equation from the roots in reverse: a root r comes from the bracket (x - r). So the equation is (x - 2)(x + 5) = 0 - expand it and tidy the signs.',
    steps: [
      'Brackets: (x - 2)(x + 5) = 0 (the -5 root gives x - (-5) = x + 5).',
      'Expand: x<sup>2</sup> + 5x - 2x - 10 = x<sup>2</sup> + 3x - 10.',
      '<b>x<sup>2</sup> + 3x - 10 = 0</b> - option B.'
    ],
    board: [
      'sum = 2 + (-5) = -3',
      'product = 2 &times; (-5) = -10',
      'x<sup>2</sup> - (sum)x + product = x<sup>2</sup> + 3x - 10 = 0'
    ],
    trap: 'Option A (x<sup>2</sup> - 3x - 10) flips the middle sign. The coefficient is <em>minus</em> the sum: -(-3) = +3. The product -10 stays as it is.'
  },

  /* ----- Simultaneous equations ----- */
  'Solve the simultaneous equations x + y = 10 and x - y = 4.': {
    idea: 'The y-terms have opposite signs (+y and -y), so adding the two equations makes y vanish - one equation, one unknown. Then substitute back for y.',
    steps: [
      'Add the equations: +y and -y cancel, giving 2x = 14.',
      'x = 7. Substitute into the first equation: 7 + y = 10.',
      'y = 3. So <b>x = 7, y = 3</b> - option B.'
    ],
    board: [
      '  x + y = 10',
      '+ x - y = 4',
      '-----------',
      '  2x = 14 &rarr; x = 7',
      '  y = 10 - 7 = 3'
    ],
    trap: 'Option A (x = 3, y = 7) swaps the two values - test both equations: 3 + 7 = 10 works, but 3 - 7 = -4, not 4. Always check your pair in the equation you did not use.'
  },
  'Solve the simultaneous equations x + y = 11 and 2x - y = 10. Find x.': {
    idea: 'Again the y-terms are opposites (+y and -y), so one addition kills y and leaves 3x = 21.',
    steps: [
      'Add: (x + y) + (2x - y) = 11 + 10.',
      '3x = 21, so x = <b>7</b> - option A.',
      'Check with y = 11 - 7 = 4: 2(7) - 4 = 10 works.'
    ],
    board: [
      '  x + y = 11',
      '+ 2x - y = 10',
      '------------',
      '  3x = 21',
      '   x = 7'
    ],
    trap: 'Option D (6): test it back - 2(6) - y = 10 gives y = 2, but 6 + 2 = 8, not 11. The pair must satisfy <b>both</b> equations; testing is faster than re-solving.'
  },
  'How many solutions do the simultaneous equations 3x + 2y = 12 and 6x + 4y = 24 have?': {
    idea: 'Before solving, check whether one equation is just a multiple of the other. If it is, they describe the same line - and two copies of the same line meet everywhere.',
    steps: [
      'Double the first equation: 6x + 4y = 24 - exactly the second equation.',
      'Same line, twice. Every point on it solves both.',
      '<b>Infinitely many solutions</b> - option C.'
    ],
    board: [
      '(1) &times; 2:  6x + 4y = 24',
      '(2)     :  6x + 4y = 24   (identical)',
      'same line &rarr; infinitely many solutions'
    ],
    trap: 'Option B (exactly one solution) is the default assumption for two equations - wrong when they collapse into one line. Multiply-check first: a multiple means no single crossing.'
  },
  'The sum of two numbers is 25 and their difference is 5. Find the larger number.': {
    idea: 'Turn the words into two equations - a + b = 25 and a - b = 5 - which is exactly the "sum and difference" pair. Adding them kills b and hands you the larger number.',
    steps: [
      'Let the numbers be a and b: a + b = 25, a - b = 5.',
      'Add: 2a = 30, so a = 15 - that is the larger number.',
      '<b>15</b> - option D. (The smaller is 10, option A.)'
    ],
    board: [
      'a + b = 25',
      'a - b = 5',
      '2a = 30 &rarr; a = 15',
      'b = 25 - 15 = 10'
    ],
    trap: 'Option A (10) is the smaller number - read the last line of the question again: it asks for the <b>larger</b>, which is the value from adding. Check: 15 + 10 = 25 and 15 - 10 = 5.'
  },

  /* ----- Probability ----- */
  'A fair die is thrown once. What is the probability of getting a 6?': {
    idea: 'Probability is favourable outcomes over total equally likely outcomes. A fair die has six equally likely faces, and only one of them is a 6.',
    steps: [
      'Total outcomes: 6 faces.',
      'Favourable: exactly one face shows 6.',
      'P = <b>1/6</b> - option C.'
    ],
    board: [
      'P = favourable &divide; total',
      '  = 1 &divide; 6',
      '  = 1/6'
    ],
    trap: 'Option D (5/6) is P(<em>not</em> 6) - the complement of the question. Only one face wins, so the numerator is 1, not 5.'
  },
  'Two fair coins are tossed. What is the probability of getting two heads?': {
    idea: 'List the equally likely outcomes - the list is short and kills all doubt: HH, HT, TH, TT. Only one of the four has two heads.',
    steps: [
      'All outcomes: HH, HT, TH, TT - four of them.',
      'Favourable: HH only.',
      'P = <b>1/4</b> - option D.'
    ],
    board: [
      'outcomes: HH HT TH TT',
      'favourable: HH (1 of 4)',
      'P = 1/4'
    ],
    trap: 'Option A (1/2) is the chance for <b>each</b> single coin - "both" multiplies: 1/2 &times; 1/2 = 1/4. Option B (3/4) is "at least one head", a different question.'
  },
  'The probability that an event occurs is 0.3. What is the probability that it does not occur?': {
    idea: 'An event and its opposite fill the whole scale: they must add to 1. So P(not A) = 1 - P(A).',
    steps: [
      'The two outcomes - occurs, does not occur - together make 1.',
      'P(not) = 1 - 0.3.',
      '= <b>0.7</b> - option D.'
    ],
    board: [
      'P(not A) = 1 - P(A)',
      '         = 1 - 0.3',
      '         = 0.7'
    ],
    trap: 'Option C (1.3) adds instead of subtracting - no probability can pass 1. Move left from 1 by 0.3 and you land on 0.7.'
  },
  'A bag contains 4 red, 5 blue and 6 green balls. Find the probability of picking a ball that is not red.': {
    idea: 'Count the "not red" balls directly, or use the complement rule. Either way, the total bag is 4 + 5 + 6 = 15 balls.',
    steps: [
      'Total: 4 + 5 + 6 = 15 balls.',
      'Not red: 5 blue + 6 green = 11 balls.',
      'P = <b>11/15</b> - option A.'
    ],
    board: [
      'total = 4 + 5 + 6 = 15',
      'not red = 5 + 6 = 11',
      'P(not red) = 11/15'
    ],
    trap: 'Option B (4/15) is exactly P(red) - the complement of what was asked. Circle the word "not" before you choose.'
  },

  /* ----- Ratios & identities ----- */
  'Evaluate: sin 30 degrees.': {
    idea: 'The standard angles 0&deg;, 30&deg;, 45&deg;, 60&deg;, 90&deg; have known sine values, and they rise smoothly: 0 &rarr; 1/2 &rarr; &radic;2/2 &rarr; &radic;3/2 &rarr; 1. sin 30&deg; is the first step on that climb.',
    steps: [
      'Recall the ladder: sin 0&deg; = 0, sin 30&deg; = 1/2, sin 45&deg; = &radic;2/2, sin 60&deg; = &radic;3/2, sin 90&deg; = 1.',
      'Read the 30&deg; rung.',
      'sin 30&deg; = <b>1/2</b> - option B.'
    ],
    board: [
      'sin 0&deg;  = 0',
      'sin 30&deg; = 1/2   &larr;',
      'sin 60&deg; = &radic;3/2 (&asymp; 0.866)',
      'sin 90&deg; = 1'
    ],
    trap: 'Option C (&radic;3/2 &asymp; 0.87) is sin 60&deg; - the pair people swap. Anchor the ladder: as the angle grows, sin climbs 0 &rarr; 1/2 &rarr; 0.87 &rarr; 1.'
  },
  'In a right-angled triangle, sin theta = 3/5. Find cos theta.': {
    idea: 'sin gives you two sides: opposite = 3, hypotenuse = 5. Pythagoras gives the third side, and then cos reads off SOH-CAH-TOA.',
    steps: [
      'sin = opposite/hypotenuse = 3/5, so opposite = 3, hypotenuse = 5.',
      'Third side: &radic;(5<sup>2</sup> - 3<sup>2</sup>) = &radic;16 = 4 (the adjacent side).',
      'cos = adjacent/hypotenuse = <b>4/5</b> - option C.'
    ],
    board: [
      'sin&theta; = 3/5 &rarr; opp = 3, hyp = 5',
      'adj = &radic;(5<sup>2</sup> - 3<sup>2</sup>) = &radic;16 = 4',
      'cos&theta; = adj/hyp = 4/5'
    ],
    trap: 'Option B (5/3) is the ratio flipped upside-down. cos is adjacent over hypotenuse, and the 3-4-5 triangle sorts the values: 4 on top, 5 underneath.'
  },
  'Simplify: sin^2 theta + cos^2 theta.': {
    idea: 'This is the Pythagorean identity - true for every angle. On any right-angled triangle, sin and cos put the two legs over the hypotenuse... and Pythagoras says the legs squared add to the hypotenuse squared.',
    steps: [
      'sin&theta; = opp/hyp and cos&theta; = adj/hyp, so sin<sup>2</sup>&theta; + cos<sup>2</sup>&theta; = (opp<sup>2</sup> + adj<sup>2</sup>)/hyp<sup>2</sup>.',
      'Pythagoras: opp<sup>2</sup> + adj<sup>2</sup> = hyp<sup>2</sup>, so the fraction is hyp<sup>2</sup>/hyp<sup>2</sup>.',
      '= <b>1</b> - option C.'
    ],
    board: [
      'sin<sup>2</sup>&theta; + cos<sup>2</sup>&theta;',
      '= (opp<sup>2</sup> + adj<sup>2</sup>) / hyp<sup>2</sup>',
      '= hyp<sup>2</sup> / hyp<sup>2</sup>',
      '= 1'
    ],
    trap: 'Option D (tan&theta;) confuses the identity with tan = sin/cos - that is a division, not this sum. Test any angle: 30&deg; gives (1/2)<sup>2</sup> + (&radic;3/2)<sup>2</sup> = 1/4 + 3/4 = 1.'
  },
  'Find the length of the hypotenuse of a right-angled triangle with legs 6 cm and 8 cm.': {
    idea: 'Pythagoras: the hypotenuse squared equals the sum of the two legs squared. Add the squares first, then take the root - in that order.',
    steps: [
      'hyp<sup>2</sup> = 6<sup>2</sup> + 8<sup>2</sup> = 36 + 64 = 100.',
      'hyp = &radic;100.',
      'hyp = <b>10</b> - option D.'
    ],
    board: [
      'hyp<sup>2</sup> = 6<sup>2</sup> + 8<sup>2</sup>',
      '     = 36 + 64 = 100',
      'hyp  = &radic;100 = 10'
    ],
    trap: 'Option B (14) is 6 + 8 - the hypotenuse is always shorter than the sum of the legs, and the squares must be added <b>before</b> the root. This is the 3-4-5 triangle doubled.'
  },

  /* ----- Permutations & combinations ----- */
  'Evaluate: 5P2.': {
    idea: 'nPr counts arrangements: order matters, so AB and BA are different. Think of it as filling r slots from n choices, one choice used up per slot.',
    steps: [
      '5P2 = two slots from five items.',
      'First slot: 5 choices. Second slot: 4 left.',
      '5 &times; 4 = <b>20</b> - option B.'
    ],
    board: [
      '5P2 = 5 &times; 4',
      '    = 20'
    ],
    trap: 'Option A (10) is 5C2 - the selection count where order is ignored. P means positions matter: AB and BA are two different arrangements, which is why 20 is double 10.'
  },
  'Evaluate: 6C2.': {
    idea: 'nCr counts selections: order ignored. Compute nPr as usual, then divide out the r! orderings you do not care about.',
    steps: [
      '6C2 = (6 &times; 5) / (2 &times; 1).',
      '= 30 / 2.',
      '= <b>15</b> - option A.'
    ],
    board: [
      '6C2 = (6 &times; 5) / (2 &times; 1)',
      '    = 30 / 2',
      '    = 15'
    ],
    trap: 'Option C (30) is 6P2 - the ordered count. "C" divides the order out (r! = 2), so the answer is half of 30.'
  },
  'In how many ways can the letters of the word MATH be arranged?': {
    idea: 'Four different letters, four slots: 4 choices for the first slot, 3 for the next, and so on. That product is the factorial 4!.',
    steps: [
      'MATH has 4 distinct letters, so no repeats to divide out.',
      'Arrange: 4 &times; 3 &times; 2 &times; 1.',
      '= <b>24</b> ways - option C.'
    ],
    board: [
      'MATH: 4 distinct letters',
      'arrangements = 4! = 4 &times; 3 &times; 2 &times; 1',
      '             = 24'
    ],
    trap: 'Option B (16) is 4<sup>2</sup> - squares do not count arrangements; the choices shrink as slots fill (4, then 3, then 2, then 1). If a letter repeated, you would divide by that letter\'s factorial - MATH has none.'
  },

  /* --- 2026-10-10: calculus topics --- */
  'Differentiate: y = (2x + 3)^4.': {
    idea: 'A bracket raised to a power needs the chain rule: differentiate the outside first, then multiply by the derivative of what is inside the bracket.',
    steps: [
      'Outside: a power of 4 comes down, reduced to 3: 4(2x + 3)<sup>3</sup>.',
      'Inside: the derivative of 2x + 3 is 2.',
      'Multiply the two: 4(2x + 3)<sup>3</sup> &times; 2 = <b>8(2x + 3)<sup>3</sup></b> - option A.'
    ],
    board: [
      'y = (2x + 3)^4',
      'outside: 4(2x + 3)^3',
      'inside:  d/dx(2x + 3) = 2',
      'dy/dx = 4(2x + 3)^3 x 2',
      '      = 8(2x + 3)^3'
    ],
    trap: 'Option B (4(2x + 3)<sup>3</sup>) stops after the outside - it forgets to multiply by the inside derivative 2. Option C never drops the power. The chain rule always does <b>both</b> jobs.'
  },
  'If y = x^4 - 2x^2, find the second derivative d^2y/dx^2.': {
    idea: 'The second derivative is just the derivative of the derivative - differentiate once, then take that result and differentiate it again.',
    steps: [
      'First pass: dy/dx = 4x<sup>3</sup> - 4x.',
      'Second pass on that result: 12x<sup>2</sup> - 4.',
      'So d<sup>2</sup>y/dx<sup>2</sup> = <b>12x<sup>2</sup> - 4</b> - option D.'
    ],
    board: [
      'y = x^4 - 2x^2',
      'dy/dx = 4x^3 - 4x',
      'd^2y/dx^2 = 12x^2 - 4'
    ],
    trap: 'Option A (4x<sup>3</sup> - 4x) is only the first derivative - the question asks for the second. Do the pass twice.'
  },
  'Differentiate: y = 3x^2(2x - 1).': {
    idea: 'A product of two x-expressions can be expanded first - for polynomials that is usually faster and safer than the product rule.',
    steps: [
      'Expand: 3x<sup>2</sup>(2x - 1) = 6x<sup>3</sup> - 3x<sup>2</sup>.',
      'Differentiate term by term: 18x<sup>2</sup> - 6x.',
      'So dy/dx = <b>18x<sup>2</sup> - 6x</b> - option B.'
    ],
    board: [
      'y = 3x^2(2x - 1)',
      '  = 6x^3 - 3x^2',
      'dy/dx = 18x^2 - 6x'
    ],
    trap: 'Option D (12x<sup>2</sup> - 6x) comes from stopping the product rule halfway: 6x(2x - 1) = 12x<sup>2</sup> - 6x, forgetting to add 3x<sup>2</sup> &times; 2 = 6x<sup>2</sup>. Expand first and nothing gets lost.'
  },
  'Differentiate: y = 1/x^2.': {
    idea: 'Rewrite the fraction as a power first - then it is the ordinary power rule, no quotient needed.',
    steps: [
      '1/x<sup>2</sup> is the same as x<sup>-2</sup>.',
      'Power rule: bring -2 down, reduce the index by 1: -2x<sup>-3</sup>.',
      'Back to fraction form: <b>-2/x<sup>3</sup></b> - option A.'
    ],
    board: [
      'y = 1/x^2 = x^-2',
      'dy/dx = -2x^(-2 - 1)',
      '      = -2x^-3',
      '      = -2/x^3'
    ],
    trap: 'Option C (-2/x<sup>2</sup>) brings the power down but forgets to reduce the index - a power always changes when you differentiate it.'
  },
  'Differentiate: y = 2x/(x + 1).': {
    idea: 'A fraction with x on top and bottom is the quotient rule: (top derivative &times; bottom - top &times; bottom derivative) over bottom squared.',
    steps: [
      'Differentiate each part: the top 2x gives 2, the bottom x + 1 gives 1.',
      'Quotient rule: [2(x + 1) - 2x(1)] / (x + 1)<sup>2</sup>.',
      'Simplify the top: 2x + 2 - 2x = 2, so <b>2/(x + 1)<sup>2</sup></b> - option C.'
    ],
    board: [
      'y = 2x / (x + 1)',
      'top: 2x -> 2,  bottom: x + 1 -> 1',
      'dy/dx = [2(x + 1) - 2x(1)] / (x + 1)^2',
      '      = [2x + 2 - 2x] / (x + 1)^2',
      '      = 2 / (x + 1)^2'
    ],
    trap: 'The numerator must fully simplify: 2(x + 1) - 2x = 2. Options A, B and D each keep something extra or flip a sign in the numerator - only C cancels down to 2.'
  },
  'Find the derivative of y = x^2 from first principles.': {
    idea: 'First principles means going back to the definition: the slope of the chord between x and x + h, then shrinking h to zero.',
    steps: [
      'Difference quotient: [(x + h)<sup>2</sup> - x<sup>2</sup>]/h.',
      'Expand the top: x<sup>2</sup> + 2xh + h<sup>2</sup> - x<sup>2</sup> = 2xh + h<sup>2</sup>, so the quotient is 2x + h.',
      'Let h tend to 0: what survives is <b>2x</b> - option B.'
    ],
    board: [
      '[(x + h)^2 - x^2] / h',
      '= [2xh + h^2] / h',
      '= 2x + h',
      'as h -> 0:  2x'
    ],
    trap: 'Option D (2x + h) is the moment before the limit - correct on the way, but h must vanish to get the derivative. The answer is 2x, not 2x + h.'
  },
  'If y = 2x^3 - x, find the value of dy/dx at x = -1.': {
    idea: 'Two moves: differentiate the whole expression, then substitute the x-value into the derivative - not into the original equation.',
    steps: [
      'Differentiate: dy/dx = 6x<sup>2</sup> - 1.',
      'Substitute x = -1: 6(-1)<sup>2</sup> - 1 = 6 - 1.',
      '= <b>5</b> - option A.'
    ],
    board: [
      'y = 2x^3 - x',
      'dy/dx = 6x^2 - 1',
      'at x = -1:  6(1) - 1',
      '            = 5'
    ],
    trap: 'Option C (-1) is the value of y itself at x = -1 - but the question asks for dy/dx there. Differentiate first, then substitute.'
  },
  'Evaluate: integral from 0 to 2 of 3x^2 dx.': {
    idea: 'A definite integral is a two-part job: integrate the expression, then plug in the top limit minus the bottom limit.',
    steps: [
      'Integrate: the integral of 3x<sup>2</sup> is x<sup>3</sup>.',
      'Top limit first: 2<sup>3</sup> = 8. Then the bottom: 0<sup>3</sup> = 0.',
      'Subtract: 8 - 0 = <b>8</b> - option C.'
    ],
    board: [
      'integral 0..2 of 3x^2 dx',
      '= [x^3] 0..2',
      '= 2^3 - 0^3',
      '= 8'
    ],
    trap: 'Option B (12) is 3x<sup>2</sup> evaluated at x = 2 - that is still the inside of the integral, not the answer. Raise the power first, then substitute.'
  },
  'Evaluate: integral from 1 to 2 of x^3 dx.': {
    idea: 'Same definite-integral recipe: integrate, then top limit minus bottom limit. Fractions just mean careful arithmetic.',
    steps: [
      'Integrate: x<sup>4</sup>/4.',
      'Top: 2<sup>4</sup>/4 = 16/4 = 4. Bottom: 1<sup>4</sup>/4 = 1/4.',
      'Subtract: 4 - 1/4 = <b>15/4</b> - option A.'
    ],
    board: [
      'integral 1..2 of x^3 dx',
      '= [x^4/4] 1..2',
      '= 16/4 - 1/4',
      '= 15/4'
    ],
    trap: 'Option B (4) drops the bottom limit - it is only the value at x = 2. A definite integral always subtracts the value at the lower limit.'
  },
  'Integrate 1/x^2 with respect to x.': {
    idea: 'Same trick as differentiating it: rewrite the fraction as a power (x<sup>-2</sup>), then integrate as usual.',
    steps: [
      'Rewrite: 1/x<sup>2</sup> = x<sup>-2</sup>.',
      'Raise the index by 1: x<sup>-1</sup>, then divide by the new index -1: -x<sup>-1</sup>.',
      'Tidy up and add C: <b>-1/x + C</b> - option B.'
    ],
    board: [
      'integral x^-2 dx',
      '= x^(-1) / (-1) + C',
      '= -x^-1 + C',
      '= -1/x + C'
    ],
    trap: 'Option C (-2/x<sup>3</sup> + C) is the <em>derivative</em> of 1/x<sup>2</sup>, not the integral. Integration raises the index; differentiation lowers it.'
  },
  'Find the area under the curve y = x^2 from x = 0 to x = 3.': {
    idea: 'The definite integral of a curve is exactly the area trapped between the curve and the x-axis.',
    steps: [
      'Area = the integral of x<sup>2</sup> from 0 to 3.',
      'Integrate: x<sup>3</sup>/3, then evaluate: 3<sup>3</sup>/3 - 0.',
      '= 27/3 = <b>9</b> square units - option C.'
    ],
    board: [
      'area = integral 0..3 of x^2 dx',
      '     = [x^3/3] 0..3',
      '     = 27/3 - 0',
      '     = 9'
    ],
    trap: 'Option A (27) is 3<sup>3</sup> without dividing by the new index - power up, then divide by the new power: 27/3 = 9.'
  },
  'Find the minimum value of y = x^2 - 4x + 7.': {
    idea: 'A turning point is where the gradient is zero: differentiate, set dy/dx = 0, solve for x, then put that x back into the original equation for the minimum value.',
    steps: [
      'dy/dx = 2x - 4. Set it to 0: 2x = 4, so x = 2.',
      'Confirm a minimum: the second derivative is 2 &gt; 0 (a valley).',
      'Substitute: y = 4 - 8 + 7 = <b>3</b> - option C.'
    ],
    board: [
      'y = x^2 - 4x + 7',
      'dy/dx = 2x - 4 = 0 -> x = 2',
      'y(2) = 4 - 8 + 7',
      '     = 3'
    ],
    trap: 'Option A (2) is the x-value where the minimum happens - but the question asks for the minimum <em>value</em>, so do not stop until you substitute back.'
  },
  'Find the equation of the tangent to the curve y = x^2 - 4x at the point where x = 3.': {
    idea: 'A tangent is a straight line, so you need a point and a gradient. The point comes from the curve; the gradient comes from dy/dx at that x.',
    steps: [
      'Point: at x = 3, y = 9 - 12 = -3, so the point is (3, -3).',
      'Gradient: dy/dx = 2x - 4 = 2 at x = 3.',
      'Straight line: y + 3 = 2(x - 3), which gives <b>y = 2x - 9</b> - option D.'
    ],
    board: [
      'point:    x = 3 -> y = -3',
      'gradient: dy/dx = 2x - 4 = 2',
      'y - (-3) = 2(x - 3)',
      'y = 2x - 9'
    ],
    trap: 'Option A (y = 2x - 3) uses the right gradient but the wrong anchor - the line must pass through the actual point (3, -3), which shifts the intercept to -9.'
  },
  'Use calculus to estimate the change in y = x^2 when x increases from 4 to 4.01.': {
    idea: 'For a tiny change in x, the change in y is about dy/dx &times; the change in x: rate times step.',
    steps: [
      'dy/dx = 2x = 8 at x = 4.',
      'Change in x: 4.01 - 4 = 0.01.',
      'Change in y is about 8 &times; 0.01 = <b>0.08</b> - option A.'
    ],
    board: [
      'dy/dx = 2x = 8 at x = 4',
      'dx = 0.01',
      'dy ~= dy/dx x dx',
      '   ~= 8 x 0.01 = 0.08'
    ],
    trap: 'Option B (0.8) slips a decimal place - 8 &times; 0.01 is 0.08, not 0.8. Keep the step tiny: rate (8) times step (0.01).'
  },
  'A body moves with velocity v = 6t^2 m/s. Find the distance covered in the first 2 seconds.': {
    idea: 'Distance is the area under the velocity graph - in calculus terms, integrate velocity to turn it back into distance.',
    steps: [
      'Integrate: s = 6t<sup>3</sup>/3 = 2t<sup>3</sup>.',
      'Limits 0 to 2: s = 2(2)<sup>3</sup> - 0 = 16.',
      'So the distance is <b>16 m</b> - option B.'
    ],
    board: [
      's = integral 6t^2 dt',
      '  = 2t^3',
      't = 0..2:  2(8) - 0',
      '        = 16 m'
    ],
    trap: 'Option A (24 m) is v at t = 2 (6 &times; 4) - that is the speed at one instant, not the distance travelled. Distance accumulates speed over time, so integrate.'
  },
  'The displacement s metres of a particle after t seconds is s = t^2 - 4t + 3. Find the time when the particle is momentarily at rest.': {
    idea: 'Momentarily at rest is calculus for velocity zero: differentiate displacement, set it to 0, and solve for t.',
    steps: [
      'Velocity v = ds/dt = 2t - 4.',
      'Set v = 0: 2t = 4, so t = 2.',
      'At <b>2 s</b> - option C.'
    ],
    board: [
      's = t^2 - 4t + 3',
      'v = ds/dt = 2t - 4',
      '2t - 4 = 0',
      't = 2 s'
    ],
    trap: 'Options A (1 s) and D (3 s) are when s = 0 - the particle passes through the origin then - but at rest is about <em>velocity</em> zero, not position. Differentiate first.'
  },
  'A rectangle has a perimeter of 20 cm. Find its maximum possible area.': {
    idea: 'Optimisation is a build-then-differentiate job: write the quantity you care about (area) in one variable, then set its derivative to zero.',
    steps: [
      'Length x means breadth 10 - x (the perimeter halves to 10).',
      'Area A = x(10 - x) = 10x - x<sup>2</sup>, so dA/dx = 10 - 2x = 0 gives x = 5.',
      'A = 5 &times; 5 = <b>25 cm<sup>2</sup></b> - option A.'
    ],
    board: [
      'sides: x and 10 - x',
      'A = x(10 - x) = 10x - x^2',
      'dA/dx = 10 - 2x = 0 -> x = 5',
      'A = 5 x 5 = 25 cm^2'
    ],
    trap: 'Option D (100 cm<sup>2</sup>) squares the 10 - treating the half-perimeter as a single side. The area peaks at the square: 5 by 5.'
  },

  /* --- 2026-10-10: curves, trig graphs, locus, data, transformations --- */
  'Find the points where the line y = 3x - 2 meets the curve y = x^2.': {
    idea: 'Where a line meets a curve the coordinates must satisfy both equations, so set the two expressions for y equal and solve the quadratic.',
    steps: [
      'Set x<sup>2</sup> = 3x - 2, giving x<sup>2</sup> - 3x + 2 = 0.',
      'Factorise: (x - 1)(x - 2) = 0, so x = 1 or x = 2.',
      'The y-values come from the line: y = 1 and y = 4, so the points are <b>(1, 1) and (2, 4)</b> - option A.'
    ],
    board: [
      'x^2 = 3x - 2',
      'x^2 - 3x + 2 = 0',
      '(x - 1)(x - 2) = 0  -> x = 1, 2',
      'y = 3(1) - 2 = 1,  y = 3(2) - 2 = 4',
      'points: (1, 1) and (2, 4)'
    ],
    trap: 'Option B (1, 1) and (4, 2) swaps the second point - each pair must satisfy BOTH equations. To finish safely, take each y from the straight line y = 3x - 2.'
  },
  'Find the radius of the circle x^2 + y^2 - 8x + 6y + 21 = 0.': {
    idea: 'The expanded form hides the centre and radius. Complete the square in x and in y to squeeze it back into (x - a)<sup>2</sup> + (y - b)<sup>2</sup> = r<sup>2</sup>.',
    steps: [
      'Group the terms: (x<sup>2</sup> - 8x) + (y<sup>2</sup> + 6y) + 21 = 0.',
      'Complete each square: (x - 4)<sup>2</sup> - 16 + (y + 3)<sup>2</sup> - 9 + 21 = 0, so (x - 4)<sup>2</sup> + (y + 3)<sup>2</sup> = 4.',
      'The right side is r<sup>2</sup> = 4: radius <b>2</b> - option A.'
    ],
    board: [
      '(x^2 - 8x) + (y^2 + 6y) + 21 = 0',
      '(x - 4)^2 - 16 + (y + 3)^2 - 9 + 21 = 0',
      '(x - 4)^2 + (y + 3)^2 = 4',
      'r = 2'
    ],
    trap: 'Option B (4) is r<sup>2</sup>, not r - after completing the square, take the square root. The radius is 2.'
  },
  'How many solutions does sin x = 1/2 have for 0 degrees <= x <= 360 degrees?': {
    idea: 'The sine graph is positive in two quadrants, so a positive sine value usually has two angles in 0 to 360. Picture the horizontal line y = 1/2 and count where it cuts the wave.',
    steps: [
      'sin x = 1/2 first happens at x = 30 degrees.',
      'In the second quadrant the angle with the same sine is 180 - 30 = 150 degrees.',
      'The line cuts the wave twice between 0 and 360, so <b>2</b> solutions - option C.'
    ],
    board: [
      'sin x = 1/2',
      'quadrant 1: x = 30',
      'quadrant 2: x = 180 - 30 = 150',
      'two cuts between 0 and 360'
    ],
    trap: 'Option A (1) stops at the first angle. There is no third angle in 0 to 360 - in the third and fourth quadrants sine is negative, so the line does not reach there.'
  },
  'The maximum value of y = sin x + cos x is:': {
    idea: 'For y = a sin x + b cos x the biggest value is sqrt(a<sup>2</sup> + b<sup>2</sup>). Here both a and b are 1.',
    steps: [
      'Maximum = sqrt(1<sup>2</sup> + 1<sup>2</sup>) = sqrt(2).',
      'It is reached where the two terms agree, at x = 45 degrees: sqrt(2)/2 + sqrt(2)/2.',
      'So the maximum is <b>sqrt(2)</b> - option C.'
    ],
    board: [
      'max of a sin x + b cos x = sqrt(a^2 + b^2)',
      '= sqrt(1 + 1)',
      '= sqrt(2)',
      'check x = 45: sqrt(2)/2 + sqrt(2)/2 = sqrt(2)'
    ],
    trap: 'Option A (2) adds the two separate maxima (1 + 1) - but sin x and cos x never hit 1 at the same angle. The true peak is sqrt(2), about 1.41.'
  },
  'The locus of a point at a constant distance d from a fixed straight line is:': {
    idea: 'Distance to a line is measured perpendicularly - and a point can be that far away on either side of the line.',
    steps: [
      'All points distance d above the line: a straight line parallel to it.',
      'All points distance d below it: another parallel line.',
      'Together: <b>a pair of parallel lines, one on each side</b> - option C.'
    ],
    board: [
      'fixed line  --------',
      'locus:      ------------  (d above)',
      '            ------------  (d below)'
    ],
    trap: 'Option A draws only one side and forgets the other - the locus is both tracks, above and below the line.'
  },
  'A point P moves so that angle APB = 90 degrees, where A and B are fixed points. The locus of P is:': {
    idea: 'A fixed right angle standing on a fixed segment is the angle-in-a-semicircle setup: every point on the circle with AB as diameter sees AB at 90 degrees.',
    steps: [
      'The angle in a semicircle is 90 degrees - the circle theorem.',
      'So P traces the circle whose diameter is AB.',
      'Locus: <b>a circle with AB as diameter</b> - option B.'
    ],
    board: [
      'A ------ B  (fixed)',
      'angle APB = 90',
      'P lies on the circle on AB as diameter',
      '(angle in a semicircle = 90)'
    ],
    trap: 'Option D (the perpendicular bisector) answers a different question - equidistant from A and B. Here the condition is a right angle at P, which gives the circle on AB.'
  },
  'A sector of 60 degrees on a pie chart represents 120 students. The total number of students is:': {
    idea: 'A pie chart runs on the full turn of 360 degrees: every sector is a fraction of 360, and the same fraction of the total.',
    steps: [
      'The sector is 60/360 = 1/6 of the circle.',
      'So 120 students are 1/6 of the total.',
      'Total = 120 &times; 6 = <b>720</b> - option C.'
    ],
    board: [
      '60 / 360 = 1/6 of the chart',
      '1/6 of total = 120',
      'total = 120 x 6 = 720'
    ],
    trap: 'Option D (360) treats the full-turn angle as the answer - degrees are not people. Convert the angle to a fraction of 360 first.'
  },
  'In the distribution 0-9: 4 students, 10-19: 6 students, 20-29: 10 students, the class mark of 20-29 is:': {
    idea: 'The class mark is the midpoint of the class - average the two ends of the group.',
    steps: [
      'Add the ends: 20 + 29 = 49.',
      'Halve: 49/2 = 24.5.',
      'So the class mark is <b>24.5</b> - option B.'
    ],
    board: [
      'class: 20 - 29',
      'midpoint = (20 + 29) / 2',
      '         = 49 / 2 = 24.5'
    ],
    trap: 'Option A (25) rounds the midpoint off - or comes from a 20-30 class. With whole-number classes the true middle sits at 24.5.'
  },
  'An enlargement of scale factor 2 maps a triangle of area 6 cm^2 onto a triangle of area:': {
    idea: 'Lengths scale by the factor k, but areas scale by k<sup>2</sup> - both the base and the height stretch.',
    steps: [
      'Lengths double (factor 2).',
      'Area factor = 2<sup>2</sup> = 4.',
      'New area = 6 &times; 4 = <b>24 cm<sup>2</sup></b> - option B.'
    ],
    board: [
      'scale factor k = 2',
      'area factor = k^2 = 4',
      '6 x 4 = 24 cm^2'
    ],
    trap: 'Option A (12 cm<sup>2</sup>) doubles once like a length - but the area grows fourfold, because both dimensions stretch.'
  },
  'The image of the point (2, 1) under a rotation of 90 degrees anticlockwise about the origin is:': {
    idea: 'A 90-degree anticlockwise turn about the origin has a fixed rule: (x, y) goes to (-y, x). Test the rule on an easy point like (1, 0).',
    steps: [
      'Rule: swap the coordinates and negate the new x: (x, y) -> (-y, x).',
      'Apply to (2, 1): (-1, 2).',
      'So the image is <b>(-1, 2)</b> - option A.'
    ],
    board: [
      '90 anticlockwise: (x, y) -> (-y, x)',
      '(2, 1) -> (-1, 2)',
      'check: (1, 0) -> (0, 1) anticlockwise'
    ],
    trap: 'Option B (1, -2) is the 90-degree <em>clockwise</em> image (x, y) -> (y, -x). The direction of the turn decides which coordinate gets the minus sign.'
  }
};
