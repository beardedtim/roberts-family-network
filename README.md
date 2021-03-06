# Roberts Family Network

## Development

### Prereqs

- Docker
- Docker Compose
- Node.JS

```
# clone code
git clone git@github.com:beardedtim/roberts-family-network.git

cd roberts-family-network

# start database and other backing services
docker-compose up -d

# set up .env.local
cp .env.example .env.local

# install deps
npm i

# run in dev mode
npm run dev
```

This will autogenerate three users: `tim`, `kit`, and `lar`, along
with assigning them `overlord` and/or `admin` roles. You can change
or modify this inside of `sql/init.sql`

## Authorization

This system uses Auth0 to handle user credentials. We may add Two Factor Authentication
and it will be handled via the same system. RFN DOES NOT STORE ANY PASSWORDS. It does
store your email internally to track the Auth0 with our internal profile.

## Screencaps

_**Feed**_

![](https://imgur.com/1BUhBQW.png)

_**Profile**_

- Others
  ![](https://imgur.com/uxuGPZ0.png)

_**Authentication by Auth0**_

![](https://imgur.com/hSAobpl.png)

## Demos

[_**Update 1**_](https://www.loom.com/share/18cb3422f158435d94a2d96916d96b30)

- Basics built

[_**Update 2**_](https://www.loom.com/share/7cc9015519da435296f33e776c95a415)

- New Types along with editing and deleting
