/* Revision notes for Mathematics */
window.NOTES = window.NOTES || [];
window.NOTES.push(
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Number bases',
    title: 'Converting between number bases',
    body: 'To convert from base 10 to another base, divide repeatedly by that base and read the remainders from bottom to top.\n\nWorked example: convert 45 to base 2.\n45 / 2 = 22 remainder 1\n22 / 2 = 11 remainder 0\n11 / 2 = 5 remainder 1\n5 / 2 = 2 remainder 1\n2 / 2 = 1 remainder 0\n1 / 2 = 0 remainder 1\nReading from bottom to top: 101101.\n\nTo convert back, expand in powers of the base: 101101 = 32 + 8 + 4 + 1 = 45.\n\nWorked check: 54 in base 4 is 312, because 3 x 16 + 1 x 4 + 2 = 54. In any base the digits run from 0 up to base minus 1.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Ratio and proportion',
    title: 'Sharing quantities in a ratio',
    body: 'A ratio compares parts of a whole. To share N60 in the ratio 2 : 3, add the parts (2 + 3 = 5) and divide: each part is 60 / 5 = 12, so the shares are N24 and N36.\n\nMake units the same before comparing. 150 cm : 2 m is 150 : 200, which simplifies to 3 : 4 by dividing through by the HCF of 50.\n\nIn direct variation y = kx. If y = 12 when x = 3, then k = 4, so y = 20 when x = 5. In inverse variation xy = k. y = 6 when x = 2 gives k = 12, so y = 4 when x = 3.\n\nA map scale of 1 : 50,000 means 1 cm represents 50,000 cm, so 8 cm on the map is 400,000 cm, that is 4 km.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Indices, logarithms and surds',
    title: 'Index laws, logarithms and surds',
    body: 'Index laws: multiply powers of the same base by adding indices (2^3 x 2^4 = 2^7 = 128), divide by subtracting (x^5 / x^2 = x^3), and raise a power to a power by multiplying ((x^3 y^2)^2 = x^6 y^4). A negative index inverts: 2^-3 = 1/8. Fractional indices give roots: 27^(2/3) = 9.\n\nA logarithm is the inverse of an index: log base 2 of 32 = 5 because 2^5 = 32. Use the laws: log 100 + log 10 = 2 + 1 = 3, and log 8 = 3 x log 2 = 0.9030.\n\nSurds: break out square factors, so sqrt(72) = sqrt(36 x 2) = 6sqrt(2). To rationalise 1/(sqrt(3) - 1), multiply top and bottom by (sqrt(3) + 1) to get (sqrt(3) + 1)/2.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Polynomials and factorisation',
    title: 'Expanding and factorising polynomials',
    body: 'Expand by distributing each term: 3(2x - 4) + 2(x + 5) = 6x - 12 + 2x + 10 = 8x - 2. Multiply every pair of brackets: (x + 4)(x - 6) = x^2 - 6x + 4x - 24 = x^2 - 2x - 24. The square pattern is (x - 3)^2 = x^2 - 6x + 9.\n\nFactorising is expanding in reverse. Take out a common factor first: 3x^2 - 12 = 3(x^2 - 4) = 3(x - 2)(x + 2). Difference of two squares: x^2 - 9 = (x - 3)(x + 3). For 2x^2 + 7x + 3, find factors of 2x^2 and of 3 that give 7x in the middle: (2x + 1)(x + 3).\n\nCheck every factorisation by re-expanding before you choose an answer.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Equations',
    title: 'Solving linear and simultaneous equations',
    body: 'To solve a linear equation, undo each operation on both sides: 3x - 7 = 14 gives 3x = 21, so x = 7. Expand brackets first: 2(x + 3) = 4x - 2 becomes 2x + 6 = 4x - 2, so 8 = 2x and x = 4.\n\nFor simultaneous equations, add or subtract to eliminate one variable: x + y = 10 and x - y = 4 add to 2x = 14, so x = 7 and y = 3. If one equation is a multiple of the other, as in 3x + 2y = 12 and 6x + 4y = 24, there are infinitely many solutions.\n\nQuadratics: factorise x^2 - 5x + 6 = 0 as (x - 2)(x - 3) = 0 to get x = 2 or x = 3, or use the formula. Split an absolute value: |2x - 6| = 4 gives 2x - 6 = 4 or 2x - 6 = -4, so x = 5 or x = 1.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Geometry and mensuration',
    title: 'Plane geometry and mensuration formulas',
    body: 'Angles on a straight line add to 180 degrees, angles in a triangle add to 180, and angles in a quadrilateral add to 360. The interior angles of an n-sided polygon add up to (n - 2) x 180, so a hexagon gives 720. Each exterior angle of a regular polygon is 360 / n.\n\nCircle rules: the angle at the centre is twice the angle at the circumference, so 65 degrees gives 130; an angle in a semicircle is 90 degrees; a tangent meets the radius at 90 degrees.\n\nArea of a triangle = 1/2 x base x height, area of a trapezium = 1/2 x (a + b) x h, and area of a circle = pi x r^2. Volume of a cuboid = l x b x h; volume of a cone = 1/3 x pi x r^2 x h. A sector of angle 90 degrees on radius 14 cm has area 1/4 x pi x r^2 = 154 cm^2 with pi = 22/7.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Trigonometry and bearings',
    title: 'Trig ratios, angles and bearings',
    body: 'In a right-angled triangle, sin = opposite / hypotenuse, cos = adjacent / hypotenuse and tan = opposite / adjacent. Learn the special values: sin 30 = 1/2, cos 60 = 1/2, tan 45 = 1, tan 60 = sqrt(3). The identity sin^2 t + cos^2 t = 1 always holds.\n\nIf sin t = 3/5, the adjacent side is 4, so cos t = 4/5. For an angle of elevation, tan 30 = height / 30, so height = 30 x tan 30 = 10sqrt(3) m.\n\nBearings are measured clockwise from north. If the bearing of B from A is 070, then the bearing of A from B is 070 + 180 = 250. Always write bearings as three figures.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Statistics and probability',
    title: 'Averages, spread and basic probability',
    body: 'Mean = total of the values divided by the number of values. For 2, 4, 6, 8, 10 the mean is 30 / 5 = 6. For the median, order the values and take the middle one, so 3, 5, 7, 9, 11 gives 7. The mode is the most frequent value, and range = highest - lowest, so 10, 15, 20, 25 gives 15.\n\nProbability = favourable outcomes / total outcomes, and it lies between 0 and 1. Picking red from 3 red and 5 blue balls gives 3/8. If P(A) = 0.3 then P(not A) = 1 - 0.3 = 0.7.\n\nFor two groups use n(A or B) = n(A) + n(B) - n(A and B). With 40 students, 25 Physics, 18 Chemistry and 5 taking neither, n(A or B) = 35, so both = 25 + 18 - 35 = 8.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Sequences and series',
    title: 'Arithmetic and geometric progressions',
    body: 'An arithmetic progression (AP) has a constant common difference d. The nth term is a + (n - 1)d, so for 2, 5, 8, 11 with a = 2 and d = 3 the 10th term is 2 + 9 x 3 = 29. The sum of n terms is Sn = n/2 x (2a + (n - 1)d); for a = 6, d = 3, n = 10 this is 5 x (12 + 27) = 195.\n\nA geometric progression (GP) has a common ratio r. The nth term is a x r^(n - 1), so 2, 6, 18 has 6th term 2 x 3^5 = 486. The sum to infinity is a / (1 - r) when r is between -1 and 1: for 8, 4, 2 it is 8 / 0.5 = 16.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Financial arithmetic',
    title: 'Interest, percentages, profit and discount',
    body: 'Simple interest: I = P x R x T / 100. On N5,000 at 10% for 2 years, I = 5000 x 10 x 2 / 100 = N1,000. A sum that doubles in 8 years earns 100% in 8 years, so the rate is 100 / 8 = 12.5% per year.\n\nCompound interest uses A = P(1 + R/100)^T: N1,000 at 10% for 2 years becomes 1000 x 1.1 x 1.1 = N1,210.\n\nPercentage profit = profit / cost price x 100, so buying at N800 and selling at N1,000 gives 25%. A 10% discount on N500 gives N450. Increase 200 by 15%: 200 x 1.15 = 230. To reverse a percentage, divide: if a number increased by 20% gives 90, the number is 90 / 1.2 = 75. As decimals, 35% = 0.35 and 0.75 = 75%.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Vectors and matrices',
    title: 'Vector operations and 2x2 matrices',
    body: 'Vectors add and subtract component by component: (3, 4) + (1, 2) = (4, 6) and (2, -1) - (-1, 3) = (3, -4). The dot product of (2, 3) and (4, 1) is 2 x 4 + 3 x 1 = 11. For the unit vector in the direction of (3, 4), divide by the length: length = sqrt(9 + 16) = 5, giving (3/5, 4/5).\n\nFor a 2 x 2 matrix, multiply every entry by the scalar: twice the matrix with rows (2, 1) and (3, 4) has rows (4, 2) and (6, 8). The determinant of rows (a, b) and (c, d) is ad - bc, so rows (3, 1) and (2, 4) give 12 - 2 = 10, and rows (2, 3) and (4, 5) give 10 - 12 = -2.'
  },
  {
    subject: 'Mathematics',
    type: 'note',
    topic: 'Permutations and combinations',
    title: 'Counting with permutations and combinations',
    body: 'A factorial is n! = n x (n - 1) x ... x 1, so 4! = 24. Permutations count arrangements where order matters: nPr = n! / (n - r)!, so 5P2 = 20, 5P3 = 60 and 6 objects taken 2 at a time give 30 arrangements.\n\nCombinations count selections where order does not matter: nCr = n! / (r! x (n - r)!), so 6C2 = 15, 6C4 = 15, and choosing 3 people from 5 gives 10.\n\nDistinct letters arrange in n! ways: MATH gives 4! = 24. For digits with no repetition, fill each place in turn: 3-digit numbers from 1, 2, 3, 4, 5 give 5 x 4 x 3 = 60. Choosing 2 captains from 8 players is 8C2 = 28.'
  },
  { subject: 'Mathematics', type: 'sheet', topic: 'Formula sheet', title: 'Formulas to know cold', body: 'Keep these ready for every geometry or mensuration question.\n- Circumference = 2 x pi x r; area of circle = pi x r^2\n- Area of triangle = 1/2 x base x height; area of parallelogram = base x height\n- Area of trapezium = 1/2 x (a + b) x h\n- Volume of cuboid = l x b x h; volume of cube = side^3\n- Volume of cone = 1/3 x pi x r^2 x h; volume of cylinder = pi x r^2 x h\n- Volume of sphere = 4/3 x pi x r^3; surface area of sphere = 4 x pi x r^2\n- Curved surface area of cylinder = 2 x pi x r x h\n- Arc length = angle/360 x 2 x pi x r; sector area = angle/360 x pi x r^2\n- Pythagoras: c^2 = a^2 + b^2; rectangle diagonal = sqrt(l^2 + b^2)\n- Sine rule: a/sin A = b/sin B = c/sin C\n- Quadratic roots: x = (-b +/- sqrt(b^2 - 4ac)) / 2a\n- Gradient m = (y2 - y1) / (x2 - x1); straight line: y = mx + c\n- Distance = sqrt((x2 - x1)^2 + (y2 - y1)^2); midpoint = ((x1 + x2) / 2, (y1 + y2) / 2)\n- Sum of interior angles = (n - 2) x 180; each exterior angle = 360 / n\n- Special angles: sin 30 = 1/2, cos 60 = 1/2, tan 45 = 1, tan 60 = sqrt(3), and sin^2 t + cos^2 t = 1' },
  { subject: 'Mathematics', type: 'sheet', topic: 'Formula sheet', title: 'Index and log rules', body: 'These algebra rules appear in almost every paper.\n- a^m x a^n = a^(m+n); a^m / a^n = a^(m-n); (a^m)^n = a^(mn)\n- a^0 = 1; a^-n = 1 / a^n; a^(1/n) is the nth root of a\n- (a/b)^n = a^n / b^n, so (2/3)^3 = 8/27\n- sqrt(a x b) = sqrt a x sqrt b; simplify surds by taking out square factors\n- Rationalise a surd denominator by multiplying top and bottom by the conjugate\n- log base a of 1 = 0; log base a of a = 1\n- log (x y) = log x + log y; log (x / y) = log x - log y; log x^n = n log x\n- If log x = 2 (base 10) then x = 100; log base 2 of 32 = 5\n- Expand: (x + a)(x + b) = x^2 + (a + b)x + ab\n- Difference of two squares: a^2 - b^2 = (a - b)(a + b)\n- Perfect square: (a - b)^2 = a^2 - 2ab + b^2\n- If x + y = 25 and x - y = 5 then x = 15 and y = 10\n- Standard form: 0.00045 = 4.5 x 10^-4 (one digit before the decimal point)' },
  { subject: 'Mathematics', type: 'sheet', topic: 'Formula sheet', title: 'Quick rules for exam day', body: 'A last-minute checklist for statistics, money and counting questions.\n- Mean = sum of values / number of values; median = middle value after ordering\n- Mode = most frequent value; range = highest - lowest\n- Probability = favourable outcomes / total outcomes; P(not A) = 1 - P(A)\n- n(A or B) = n(A) + n(B) - n(A and B)\n- AP nth term = a + (n - 1)d; AP sum = n/2 x (2a + (n - 1)d)\n- GP nth term = a x r^(n - 1); sum to infinity = a / (1 - r) when r is between -1 and 1\n- Simple interest = P x R x T / 100; amount = P + interest\n- Compound amount = P x (1 + R/100)^T\n- Percentage profit = profit / cost price x 100; percentage error = error / actual value x 100\n- Discount: selling price = marked price x (1 - rate / 100)\n- nPr = n! / (n - r)! for arrangements; nCr = n! / (r! x (n - r)!) for selections\n- n! = n x (n - 1) x ... x 1; distinct items arrange in n! ways\n- Direct variation: y = kx; inverse variation: y = k / x\n- Reverse a percentage by dividing: 90 after a 20% increase came from 90 / 1.2 = 75' }
);
