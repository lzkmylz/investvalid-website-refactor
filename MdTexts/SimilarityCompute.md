# Background
In econometrics, the prices of stock in a given time range is non-reposeful time series. So, if we want to measure the similarity of two stocks, they must have co-integration property. The co-integration can be compute as follow:

We suppose that the prices of stock *A* in time range *T* can be denote as P<sub>t</sub><sup>A</sup>(t=0,1,2,...*T*) and the prices of stock *B* can be denote as P<sub>t</sub><sup>B</sup>(t=0,1,2,...*T*). If P<sub>t</sub><sup>A</sup> is not strict stationary, then we need {P<sub>t</sub><sup>A</sup> - P<sub>t-1</sub><sup>A</sup>} to be reposeful, which called integrated of order 1.

Before we check the co-integration property of stock pair, we need check each stock if it has integrated of 1 by using ADF (Augment Dicky-Fuller) Test. If ADF test is not passed, the output score will direct be 0.

Then we can use OSL method to construct the regression function:

P<sub>t</sub><sup>B</sup> = α + βP<sub>t</sub><sup>A</sup> + ε<sub>t</sub>

then, we have:

ε&#770; = P<sub>t</sub><sup>B</sup> - (α&#770; + βP<sub>t</sub><sup>A</sup>)

The score is valued by the R-squrd of regression function.