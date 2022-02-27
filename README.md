# OPN Challenge Covid Tracker
Here is the Covid Tracker for Job interview challenge, **focus on simplicity nothing fancy**

## Built with
- Apollo GraphQL
- NextJS and ReactJS
- Just that!

## Development
You need just
- NodeJS 16++ from https://nodejs.org/en/
- with Yarn https://yarnpkg.com/
- Linux or MacOS based OS ( maybe Ubuntu? https://ubuntu.com/ )

and then
```bash
$ yarn install
$ yarn dev
```

## Build && Production Start
```bash
$ yarn build
$ yarn start
```

> The DB have some seed for your convinence please use `?session-id=default` to get some seed without adding the data by yourself 😎



## Todo
- [ ] ~~User can click on (+) to add new patient up to 8 patients.~~
- [x] User can click on (+) to add new patient up to no limit patients.
- [x] User can add each patient information using form on top, the patient contains these data
  - Gender: string
  - Age: integer
  - Occupation: string

- [x] User can add timeline entry using form on the right, a timeline entry contains these data
  - Time From: datetime
  - Time To: datetime
  - Detail: string
  - Location Type: string
  - Location: string
  - Location type can be only these following value
    - INDOOR
    - OUTDOOR
    - HOME
    - TRAVELLING
- [x] When location type is INDOOR and OUTDOOR user need to specify the location name.

- [x] On the left side use patient data and timeline entry data to display data as show in the design
- [x] Timeline activities must be sorted by Time.
- [ ] Each timeline entry must not collapsed with other entry.
- [x] Timeline activities must be grouped by date.
- [x] Visited locations must be sorted by name.
- [ ] User can remove timeline entry when click on (x) button.
- [x] User can remove patient and timeline entries by click on Remove Patient button on he top right.
- [x] Make it responsive and look nice on all screen sizes.
- [x] Update README.md to containing setup instructions, pretend that reviewer who has brand new laptop can set it up successfully.

- [ ] BONUS POINT I: Cover the use case with test.
- [ ] BONUS POINT II: Feel free to make it better than the given design 😉
- [x] BONUS POINT III: Use GraphQL as API