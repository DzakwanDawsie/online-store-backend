# Online Store Backend
[![Depedencies](https://camo.githubusercontent.com/7f8b6716845b5d9cd69f8ce04e587bb955f45040549f33cbd5e9baf464ae5e7e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4e6573744a732d6561323834353f7374796c653d666c61742d737175617265266c6f676f3d6e6573746a73266c6f676f436f6c6f723d7768697465)](https://nestjs.com/)

Simple backend API for online store

## Functions
- Authentication with JWT
- Show products
- Make new order
- Submit payment proof
- Show orders
- Verify order
- Mark order as shipped

## Installation
1. Clone repositories
```
$ git clone https://github.com/DzakwanDawsie/online-store-backend.git
```

2. Install packages
```
$ npm install
```

3. Configure the config
```
$ cp config-example.yml config.yml
$ vim config.yml
```

4. Configure orm configuration
```
$ cp ormconfig-example ormconfig.json
$ vim ormconfig.json
```

5. Run migrations to create tables and seeding data samples
```
$ npm run migration:run
```

6. Run the project
```
$ npm run start
```

## API Route Lists
Here the API documentation : https://documenter.getpostman.com/view/2752398/UV5ZCx4L
