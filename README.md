# Charity App

## Introduction
The Charity App is a platform that connects volunteers and charitable organizations with those in need. Developed using React Native Expo for the frontend and ASP.NET Core 3 for the backend, this application emphasizes community solidarity, creating a strong bond between those who have the ability to help and those in need of support.

## Basic Features
1. **Manage Charitable Organizations**
   - Add, edit, and delete information about charitable organizations.

2. **Recruit and Record Volunteers**
   - Track information about volunteers, including skills and availability.

3. **Manage Charity Events**
   - Create and manage information about charitable events.

4. **Manage Help Requests**
   - Record and process help requests from users.

5. **Match Volunteers and Organizations with Support Needs**
   - Connect volunteers/organizations with those in need and record the results.

6. **Statistical Reports**
   - Display statistical reports on charitable activities.

7. **Account Management and Content Control**
   - Functionality for system administrators to manage accounts and control content.

## Technology Stack
- **Frontend:** React Native Expo
- **Backend:** ASP.NET Core 3
- **Database:** MySQL

## Installation Guide
### System Requirements
- Node.js
- NPM (Node Package Manager)
- .NET Core 3
- Expo CLI
- MySQL

### Installation and Running
1. Clone the repository to your machine.
   ```bash
   git clone https://github.com/Thanhdvt/charity-app.git
   cd charity-app
   ```

2. Backend
   ```bash
   cd backend
   dotnet restore
   dotnet run --urls "http://192.168.x.x:5000" (ở đây là .2.13)
   ```

3. Frontend
   ```bash
   cd frontend
   npm install
   npm start hoặc npx expo start -c (chạy và xóa cache)
   ```
### Deploy
1. Frontend
```bash
   b1: npm install -g eas-cli
   b2: eas whoami (kiểm tra xem đăng nhập chưa) hoặc eas login( để đăng nhập )
   b3: eas build:configure
   b4: eas build -p android --profile preview (cho android)
hoặc
   b1: npm install -g eas-cli
   b2: eas whoami (kiểm tra xem đăng nhập chưa) hoặc eas login( để đăng nhập )
   b3: eas build --platform ios --auto-submit (cho ios)
   b4: yes -> nhập Apple ID là gmail đăng ký ios
   b5: uploade store -> create key
```

### Directory Structure

* `backend`: Contains the source code of the backend written in ASP.NET Core 3.
* `frontend`: Contains the source code of the frontend written in React Native Expo.
* `docs`: Documentation or guides related to the application.

## Contact
If you have any questions or suggestions, please contact us via email: thanhak2k2@gmail.com.

We welcome contributions and feedback from the developer community. Thank you for using our Charity App application!
