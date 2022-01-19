import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, Subject, throwError as observableThrowError, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  
  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) {

    this.userLoggedIn.next(false);
  }

  login(email, password): Observable<any> {
    const url = environment.loginUrl;
    // const url = "http://127.0.0.1:8000/api/login";
    const body = {
      email: email,
      password: password,
    };

    return this.http.post(url, body).pipe(
      map((response: Response) => {
        this.setUserLoggedIn(true);
        return response;
      }),
      catchError((error: any) => {
        console.error("Error", error);
        if(error.status === 401) {
            return [{status: false, message: error.error}];
        }
        return error;
      })
    );
  }

  register(userData): Observable<any> {
    const url = environment.registerUserUrl;
    // const url = "http://127.0.0.1:8000/api/register";

    return this.http
      .post(url, userData, { responseType: "json" })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  registerPalUser(userData): Observable<any> {
    const url = environment.registerUserUrl;
    // const url = 'http://127.0.0.1:8000/api/register';

    return this.http
      .post(url, userData, { responseType: "json" })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  uploadPhoto(file: File, uid: string) {
    const url = `https://api.pals.africa/api/uploadpp`;
    const formData: FormData = new FormData();
    formData.append("photo", file);
    formData.append("uid", uid);

    return this.http.post(url, formData, { responseType: "json" }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  mapUploadedFiles(user_id, path) {
    const url = `https://api.pals.africa/api/matchuserupload`;
    let params = new HttpParams();
    params = params.append("path", path);
    params = params.append("transaction_id", user_id);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  getUserDetails(phoneNumber): Observable<any> {
    const url = "https://api.pals.africa/api/getuserbyphone";
    let params = new HttpParams();
    params = params.append("user_phone", phoneNumber);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  getUserDetailsById(uid): Observable<any> {
    const url = "https://api.pals.africa/api/getuserbyid";
    let params = new HttpParams();
    params = params.append("uid", uid);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  aupDateUserAuth(userData) {
    const url = "https://api.pals.africa/api/register";
    let params = new HttpParams();
    params = params.append("user_uid", userData.user_uid);
    params = params.append("email", userData.email);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  updateEmail(userData) {
    const url = `https://api.pals.africa/api/updateemail`;
    let params = new HttpParams();
    params = params.append("id", userData.id);
    params = params.append("email", userData.email);

    return this.http.post(url, null, { responseType: "json", params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  updatePassword(userData) {
    const url = environment.updatePasswordUrl;
    // const url = `http://127.0.0.1:8000/api/forgotpassupdate`;
    let params = new HttpParams();
    params = params.append("user_id", userData.user_id);
    params = params.append("password", userData.password);

    return this.http.post(url, null, { responseType: "json", params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  verifyUserPassword(userData) {
    const url = `https://api.pals.africa/api/verifyuserpassword`;
    return this.http.post(url, userData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  verifyEmail(otp: string, userID: string) {
    const url = environment.verifyEmailUrl;;
    // const url = `http://127.0.0.1:8000/api/verifyemail`;
    let params = new HttpParams();
    params = params.append("user_id", userID);
    params = params.append("otp", otp);

    return this.http.post(url, null, { responseType: "json", params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  sendEmailVerificationCode(userData) {
    const url = `https://api.pals.africa/api/sendotptoemail`;
    let params = new HttpParams();
    params = params.append("id", userData.id);
    params = params.append("email", userData.email);

    return this.http.post(url, null, { responseType: "json", params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  sendOTPToEmail(data): Observable<any> {
    const url = environment.sendOTPtoEmailUrl;
    // const url = `http://127.0.0.1:8000/api/sendotptoemailforgotpassword`
    return this.http.post(url, data).pipe(
      map(response => {
        return response;
      })
    )
  }

  sendSMSVerificationCode(userData) {
    const url = `https://api.pals.africa/api/sendotptomobile`;

    return this.http.post(url, userData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  verifyUserByOTP(userData) {
    const url = `https://api.pals.africa/api/verifyotp`;

    return this.http.post(url, userData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }


  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

}
