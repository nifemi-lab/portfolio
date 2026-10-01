/* Revision notes for Further Mathematics */
window.NOTES = window.NOTES || [];
window.NOTES.push(
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Matrices and determinants',
    title: 'Matrix operations and determinants',
    body: 'Add and subtract matrices entry by entry, and only when they have the same order. Multiply row by column: a 2 x 3 matrix times a 3 x 4 matrix gives order 2 x 4.\n\nScalar multiplication changes every entry: 2 x [[1, 3], [4, 5]] = [[2, 6], [8, 10]]. The transpose swaps rows into columns, and a matrix always has the same determinant as its transpose.\n\nFor 2 by 2 [[a, b], [c, d]] the determinant is ad - bc, so [[2, 3], [1, 4]] gives (2 x 4) - (3 x 1) = 5. The inverse is 1/(ad - bc) x [[d, -b], [-c, a]], so [[3, 5], [2, 3]] with determinant -1 has inverse [[-3, 5], [2, -3]].\n\nExpand a 3 by 3 determinant along the row with the most zeros, using signs + - +. The matrix [[2, 1, 3], [1, 0, 2], [4, 5, 1]] gives determinant 2. Determinant zero means the matrix is singular and has no inverse, the usual exam follow-up.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Vectors',
    title: 'Scalar and vector products',
    body: 'The magnitude of (3, 4) is sqrt(9 + 16) = 5. Divide a vector by its own magnitude to get the unit vector, so (3, 4) gives (3/5, 4/5).\n\nThe scalar product (2, 3).(4, 1) = 8 + 3 = 11, and also a.b = |a||b| cos(theta). So two vectors are perpendicular when a.b = 0, and the angle between them is cos inverse of a.b divided by |a||b|.\n\nThe vector product has magnitude |a||b| sin(theta). Its direction follows i x j = k, j x k = i, k x i = j, while j x i = -k.\n\nUse a x b = (a2 b3 - a3 b2, a3 b1 - a1 b3, a1 b2 - a2 b1): (1, 2, 3) x (4, 5, 6) = (12 - 15, 12 - 6, 5 - 8) = (-3, 6, -3).\n\nTwo vectors are parallel when a = k b for some scalar k, and the scalar triple product i.(j x k) = 1.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Binomial theorem',
    title: 'Binomial expansion shortcuts',
    body: '(a + b)^n expands into n + 1 terms, so (a + b)^7 has 8 terms. The rth term is C(n, r - 1) a^(n - r + 1) b^(r - 1), so the 11th term of (a + b)^20 is C(20, 10) a^10 b^10.\n\nC(n, r) = n! / (r! (n - r)!), which gives C(10, 3) = 120 and C(8, 3) = 56. Also C(n, r) + C(n, r + 1) = C(n + 1, r + 1).\n\nThe coefficient of x^3 in (1 + x)^5 is C(5, 3) = 10, and the middle term of (1 + x)^10 is C(10, 5) x^5 = 252 x^5.\n\nSum of all coefficients: put x = 1, so (1 + 1)^8 = 256. In (2 + x)^5 the coefficient of x^2 is C(5, 2) x 2^3 = 80.\n\nIn (x + 1/x)^6 the general term is C(6, r) x^(6 - 2r); setting 6 - 2r = 0 gives the constant term C(6, 3) = 20.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Partial fractions',
    title: 'Splitting fractions into partial fractions',
    body: 'Write a proper fraction as a sum of simpler fractions, giving every factor its own numerator.\n\nFor distinct linear factors use the cover-up method. In 1/((x + 1)(x + 2)), the part over x + 1 is 1/(x + 2) evaluated at x = -1, which is 1, and the part over x + 2 is 1/(x + 1) evaluated at x = -2, which is -1. So the split is 1/(x + 1) - 1/(x + 2).\n\n(2x + 3)/(x(x + 1)) becomes 3/x - 1/(x + 1), because 3(x + 1) - x = 2x + 3.\n\nA repeated factor needs one fraction for each power, so x^2(x + 1) needs A/x + B/x^2 + C/(x + 1): three fractions.\n\nAlways recombine to check: (1/3)/(x - 1) + (2/3)/(x + 2) gives x/((x - 1)(x + 2)), since (1/3)(x + 2) + (2/3)(x - 1) = x.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Sequences and series',
    title: 'Arithmetic and geometric progressions',
    body: 'AP: nth term = a + (n - 1)d, sum = n/2 [2a + (n - 1)d]. If the 3rd term is 7 and the 7th is 19, then 4d = 12, so d = 3, a = 1, and the 20th term is 1 + 19 x 3 = 58.\n\nSum of 2, 5, 8 for 20 terms = 20/2 [4 + 19 x 3] = 10 x 61 = 610.\n\nGP: nth term = a r^(n - 1), sum = a(r^n - 1)/(r - 1), sum to infinity = a/(1 - r) when |r| is smaller than 1.\n\nGP 2, 6, 18 has 5th term 2 x 3^4 = 162. Sum to infinity of 8, 4, 2 is 8/(1 - 1/2) = 16, and a = 6 with r = 1/3 gives 6/(2/3) = 9.\n\nArithmetic mean of 4, 7, 10, 13, 16 = 50/5 = 10, geometric mean of 4 and 9 = sqrt(36) = 6, and n(n + 1)/2 adds the first n natural numbers.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Limits',
    title: 'Evaluating limits quickly',
    body: 'Substitute first. If you get a number, stop: the limit of 1/x as x approaches infinity is 0.\n\nIf substitution gives 0/0, factorise and cancel. (x^2 - 9)/(x - 3) = x + 3, so the limit at x = 3 is 6, and (x^3 - 8)/(x - 2) = x^2 + 2x + 4, which gives 12 at x = 2.\n\nIf a square root blocks you, multiply by its conjugate: (sqrt(x) - 2)/(x - 4) becomes 1/(sqrt(x) + 2), so the limit at x = 4 is 1/4.\n\nTwo standard limits are worth memorising: sin(x)/x tends to 1 as x approaches 0, and (1 + x)^(1/x) tends to e.\n\nA limit exists only when the left-hand limit equals the right-hand limit, and the function need not be defined at the point.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Differentiation',
    title: 'Rules, minima, maxima and rates',
    body: 'Power rule: d/dx (x^n) = n x^(n - 1), so d/dx (x^3) = 3x^2 and d/dx (1/x) = -1/x^2.\n\nStandard results: d/dx sin(x) = cos(x), d/dx ln(x) = 1/x, and d/dx e^(3x) = 3e^(3x) by the chain rule.\n\nProduct rule: d/dx (x^2 sin(x)) = 2x sin(x) + x^2 cos(x). Quotient rule: d/dx (x/(x + 1)) = ((x + 1) - x)/(x + 1)^2 = 1/(x + 1)^2.\n\nOne-line chain rule: y = (3x + 1)^5 gives dy/dx = 5(3x + 1)^4 x 3 = 15(3x + 1)^4.\n\nStationary points: set dy/dx = 0. Negative d^2y/dx^2 means a maximum, positive means a minimum. For y = x^2 - 4x + 1, dy/dx = 2x - 4 = 0 at x = 2, giving minimum value -3.\n\nRates: y = 5x^2 - 3x + 7 has dy/dx = 10x - 3, which is 17 at x = 2. The tangent to y = x^2 at (1, 1) has gradient 2, so y = 2x - 1.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Integration',
    title: 'Integrals and area under curves',
    body: 'Reverse the derivative: integral of x^n = x^(n + 1)/(n + 1) + c, so integral of x^2 = x^3/3 + c and integral of 3x^2 + 2x = x^3 + x^2 + c.\n\nSpecial cases: the integral of 1/x is ln|x| + c, of e^(2x) is e^(2x)/2 + c, of a constant k is kx + c, and of sin(x) is -cos(x) + c.\n\nWhen the bracket is linear, also divide by the inside coefficient: the integral of (2x + 1)^4 is (2x + 1)^5/10 + c.\n\nDefinite integrals: substitute the limits and subtract. From 1 to 2, the integral of 3x^2 is 8 - 1 = 7; from 0 to 2, the integral of x^2 is 8/3.\n\nArea under a curve is the definite integral: y = x from 0 to 4 gives [x^2/2] = 8. The integral of an odd function from -a to a is zero. For parts, integral of x cos(x) = x sin(x) + cos(x) + c.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Mechanics',
    title: 'Motion, projectiles, forces, energy and moments',
    body: 'Constant acceleration: v = u + at, s = ut + 1/2 a t^2, v^2 = u^2 + 2as. A body starting from rest at 10 m/s^2 for 3 s covers 45 m.\n\nProjectiles: time of flight = 2 u sin(theta)/g, maximum height = u^2 sin^2(theta)/(2g), range = u^2 sin(2 theta)/g, and range is greatest at 45 degrees. Speed 30 at 45 degrees with g = 10 gives range 90 m.\n\nForces: F = ma, weight = mg, friction = mu R. A 30 N pull against 6 N friction on a 3 kg body gives acceleration 8 m/s^2.\n\nEnergy and momentum: work = Fs, power = work/time, kinetic energy = 1/2 m v^2, potential energy = mgh. Momentum = mv and impulse = Ft = change in momentum, so total momentum is conserved in collisions.\n\nMoments: moment = force x perpendicular distance, and equilibrium requires clockwise moments = anticlockwise moments, so 20 N at 3 m balances 15 N at 4 m.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Statistics',
    title: 'Grouped data and standard deviation',
    body: 'The mean of raw data is the sum divided by the count: 2, 5, 7, 8, 13 gives 35/5 = 7.\n\nFor grouped data use class midpoints: mean = sum(f x) / sum(f). With values 1, 2, 3, 4 carrying frequencies 2, 3, 4, 1, sum(f x) = 24 and sum(f) = 10, so the mean is 2.4.\n\nVariance is the average of the squared deviations. For 1, 2, 3, 4, 5 the mean is 3, the squared deviations are 4, 1, 0, 1, 4, so variance = 10/5 = 2 and standard deviation = sqrt(2) = 1.41.\n\nStandard deviation is always the square root of variance, so variance 16 gives standard deviation 4. Adding the same constant to every value moves the mean but leaves the standard deviation unchanged.\n\nOther measures: range = largest - smallest (9 - 2 = 7), the median is the middle of ordered data, interquartile range = Q3 - Q1, and the modal class has the highest frequency.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Probability and combinations',
    title: 'Probability, permutations and combinations',
    body: 'Probability: P(A) = favourable outcomes / total outcomes, and P(not A) = 1 - P(A).\n\nFor independent events P(A and B) = P(A) x P(B), so 0.3 and 0.5 give 0.15. For mutually exclusive events P(A or B) = P(A) + P(B) and P(A and B) = 0. Conditional probability is P(A given B) = P(A and B) / P(B).\n\nTwo dice give 36 equally likely totals, so P(total of 7) = 6/36 = 1/6, and two coins give P(two heads) = 1/4.\n\nOrder matters: P(n, r) = n! / (n - r)!, so 5 people in a row give 120 arrangements.\n\nOrder does not matter: C(n, r) = n! / (r! (n - r)!), so choosing 3 from 8 gives 56 committees. Six people round a table give (6 - 1)! = 120 seatings.\n\nWith repeated letters divide by the factorials of the repeats: MATHEMATICS has M, A, T twice in 11 letters, so 11!/(2! 2! 2!) = 4989600 arrangements.'
  },
  {
    subject: 'Further Mathematics',
    type: 'note',
    topic: 'Complex numbers',
    title: 'Working with complex numbers',
    body: 'Powers of i cycle every four: i^2 = -1, i^3 = -i, i^4 = 1, then the cycle repeats.\n\nAdd real parts and imaginary parts separately: (2 + 3i) + (1 - 5i) = 3 - 2i.\n\nMultiply with FOIL and replace i^2 by -1: (1 + i)(1 - i) = 1 - i^2 = 2, and (2 + i)^2 = 4 + 4i + i^2 = 3 + 4i.\n\nThe conjugate of a + bi is a - bi, so the conjugate of 3 - 2i is 3 + 2i.\n\nThe modulus of a + bi is sqrt(a^2 + b^2): |3 + 4i| = sqrt(9 + 16) = 5, and |1 - i| = sqrt(2).\n\nThe argument is the angle from the positive real axis; 1 + i has equal parts, so its argument is tan inverse of 1 = 45 degrees. A complex number is purely imaginary when its real part is 0.'
  },
  {
    subject: 'Further Mathematics',
    type: 'sheet',
    topic: 'Formula sheet',
    title: 'Mechanics formulas on one page',
    body: '- v = u + at\n- s = ut + 1/2 a t^2\n- v^2 = u^2 + 2as\n- F = ma; weight = mg; friction = mu R\n- projectile time of flight = 2 u sin(theta) / g\n- projectile maximum height = u^2 sin^2(theta) / (2 g)\n- projectile range = u^2 sin(2 theta) / g; largest at 45 degrees\n- momentum = mv; impulse = Ft = change in momentum\n- work = Fs; power = work / time\n- kinetic energy = 1/2 m v^2; potential energy = mgh\n- moment = force x perpendicular distance; clockwise moments = anticlockwise moments'
  },
  {
    subject: 'Further Mathematics',
    type: 'sheet',
    topic: 'Formula sheet',
    title: 'Calculus formulas on one page',
    body: '- d/dx (x^n) = n x^(n - 1)\n- d/dx (sin x) = cos x; d/dx (cos x) = -sin x\n- d/dx (e^x) = e^x; d/dx (ln x) = 1/x; d/dx (1/x) = -1/x^2\n- product rule: d/dx (uv) = u dv/dx + v du/dx\n- quotient rule: d/dx (u/v) = (v du/dx - u dv/dx) / v^2\n- chain rule: dy/dx = dy/du x du/dx\n- stationary point: dy/dx = 0; maximum if d^2y/dx^2 is negative, minimum if positive\n- integral of x^n = x^(n + 1)/(n + 1) + c\n- integral of 1/x = ln|x| + c; integral of e^(kx) = e^(kx)/k + c\n- integral of sin x = -cos x + c; integral of cos x = sin x + c\n- definite integral from a to b = F(b) - F(a)\n- limit of sin(x)/x as x approaches 0 = 1'
  },
  {
    subject: 'Further Mathematics',
    type: 'sheet',
    topic: 'Formula sheet',
    title: 'Other formulas to memorise',
    body: '- determinant of [[a, b], [c, d]] = ad - bc\n- inverse of [[a, b], [c, d]] = 1/(ad - bc) x [[d, -b], [-c, a]]\n- det(A) = det(transpose of A); determinant 0 means singular\n- magnitude of (x, y) = sqrt(x^2 + y^2); unit vector = vector / magnitude\n- a.b = |a||b| cos(theta); perpendicular when a.b = 0\n- |a x b| = |a||b| sin(theta); i x j = k\n- AP: nth term = a + (n - 1)d; sum = n/2 [2a + (n - 1)d]\n- GP: nth term = a r^(n - 1); sum = a(r^n - 1)/(r - 1); sum to infinity = a/(1 - r)\n- C(n, r) = n! / (r! (n - r)!); P(n, r) = n! / (n - r)!\n- C(n, r) + C(n, r + 1) = C(n + 1, r + 1)\n- circular arrangements of n people = (n - 1)!\n- i^2 = -1, i^4 = 1; modulus of a + bi = sqrt(a^2 + b^2)\n- mean of grouped data = sum(f x) / sum(f); standard deviation = sqrt(variance)\n- P(A or B) = P(A) + P(B) - P(A and B)\n- P(A and B) = P(A) x P(B) when independent; P(not A) = 1 - P(A)'
  }
);
