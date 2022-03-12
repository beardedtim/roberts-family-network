# Roberts Family Network

## Development

```
git clone git@github.com:beardedtim/roberts-family-network.git
cd roberts-family-network
docker-compose up -d
cp .env.example .env.local
npm run dev
```

This will autogenerate three users: `tim`, `kit`, and `lar`, along
with assigning them `overlord` and/or `admin` roles. You can change
or modify this inside of `sql/init.sql`

## Authorization

This system _only_ uses `OTP` passwords via an authenticator app,
such as [this app](https://play.google.com/store/apps/details?id=com.twofasapp&hl=en_US&gl=US)
that you may use for other 2FA systems.

You will need to generate a QR code for each user by going to

```
GET /internal/qrcodes/:user-idd
```

This is to be removed before going public and to only be exposed/used locally when signing someone
up for the first time.

The flow for signing someone in would be:

- Create a DB record of their username and email
- Use the ID generated to generate the QR code
- Have user scan QR code to add to authenticator app on their device

The flow for logging in would be:

- GET /login
- Fill out username and current code in authenticator app

![When logged out](https://imgur.com/rEChzxq.png)
![When viewing feed](https://imgur.com/onckkrz.png)
![When viewing an item](https://imgur.com/vQ5hGg1.png)
