# Test backend assignment

Task is to create backend application in Node.js using any SQL database. This application should communicate with frontend via GraphQL. There is no need to do frontend in this assessment. You can use any libraries you may consider useful. The assessment is to create an application for book catalogue.

## Use cases:

* User should be able to:
    * [x] log in
    * [x] add new bookedit
    * [x] edit existing book
    * [x] delete book
    * [x] “travel back” in time and see older state of any book (or library?).
* [x] Anonymous user should be able to find some book by author name or book title.
* [ ] Pagination is not required but is big plus.

## Minimum data requirements:

* User:
    * [x] email
    * [x] password
* Book:
    * [x] title
    * [x] author
    * [x] year of publication
    * [ ] genres - only a single field in DB, not standalone entity with realtions
    * [x] rating

NOTE: There are no fixtures.

## Sample project Requirements
* Docker

## Installation

After confirming that your environment meets the above [requirements](#requirements), clone `vestberry` by doing the following:

```bash
$ git clone git@github.com:ADes-FIIT/Vestberry-Test-Assignment.git <directory>
$ cd <directory>
```

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ docker-compose up
```

After this you can open in your browser the GraphiQL at [http://localhost:8000/graphql](http://localhost:8000/graphql)

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

|`yarn <script>`        |Description|
|-----------------------|-----------|
|`start`                |Serves your app at `localhost:8000`|
|`lint`                 |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`lint:fix`             |Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|
