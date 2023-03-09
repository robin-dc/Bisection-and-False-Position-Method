#include <iostream>

using namespace std;
float a,b,c;
int XL;
int XU;


void guess(){
    cout << "equation can be solve!" << endl;
    cout << "\nPlease enter your guesses" << endl;
    cout << "XL: ";
    cin >> XL;
    cout << "XU: ";
    cin  >> XU;
    if(XU < XL){
        cout << "XL cannot be less than XU, enter again!" << endl;
        guess();
    }
    else{
        float squarexl = XL*XL;
        float squarexu = XU*XU;
        float quadxl = a*squarexl + b*XL + c;
        float quadxu = a*squarexu + b*XU + c;
        float XR = XL + XU /2;
        float squarexr = XR*XR;
        float quadxr = a*squarexr + b*XR + c;
        float RE = XU;

        cout << "\n" << endl;
        cout <<"Your f(xl) is "<< quadxl << "\n" << "Your f(xu) is "<< quadxu << endl;

        if(quadxl*quadxu < 0){
            cout << "PASSED" << endl;
            cout << "\nYour XR is: "<< XR << endl;
            cout << "Your f(xr) is: "<< quadxr << endl;
            cout << "Your f(xr) * f(xu) is: "<< quadxr * quadxu<< endl;
            cout << "Your f(xr) * f(xl) is: "<< quadxr * quadxl<< endl;
            if(quadxr * quadxu > 0){
                XU = XR;
            }
            else if(quadxr * quadxl > 0){
                XL = XR;
            }
        }
        else{
            cout << "The root is not between your guesses, change you guesses" << endl;
        }

    }
}




int main()
{
    int x = 1;
    while (x > 0){

        cout << "Bisection Method" << endl;
        cout << "\nPlease enter your constant numbers (a,b,c)" << endl;
        cout << "A: ";
        cin >> a ;
        cout << "B: ";
        cin >> b ;
        cout << "C: ";
        cin >> c ;

        int square = b*b;
        float result = square - 4*a*c;
        cout << "checking result is " << result << endl;

        if(result < 0){
            cout << "equation has Imaginary roots, change your values." << endl << endl;
            x+=1;
        }
        else{
            guess();
        }

    }



    return 0;
}
