## Requirement

nvm or node js version 18.16.0

## Task 1

### How to run

Run `yarn task1` command accept 3 arguments `number`, `step`, `pair`

example

```bash
yarn task1 --number=2,4,7,5,3,5,8,5,2,7 --step=3 --pair=10
```

## Task 2

### How to run

1. Run `nvm use` | to select node js version
2. Run `yarn install` command to install packages
3. Run `yarn task2` command to start server

### API

1. POST `/login` to generate access token and refresh token

- request body `username` and `password`

- default username and password
    > username: `user1` | required

    > password: `password1` | required

- return `accessToken` and `refreshToken`

2. POST `/refresh` to generate access token

- request body `refreshToken` is required

- return `accessToken`

3. GET `/protected`

- required headers `authorization: Bearer token...`

- return
    > `message` | message for success login

    > `user` | JwtPayload