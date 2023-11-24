# `How to implement a Custom Newsletter form with ConvertKit and Effect`
<p>
  <a href="https://github.com/SandroMaglione">
    <img alt="GitHub: SandroMaglione" src="https://img.shields.io/github/followers/SandroMaglione?label=Follow&style=social" target="_blank" />
  </a>
  <a href="https://twitter.com/SandroMaglione">
    <img alt="Twitter: SandroMaglione" src="https://img.shields.io/twitter/follow/SandroMaglione.svg?style=social" target="_blank" />
  </a>
</p>

Learn how to use [Effect](https://effect.website/) to perform a request to subscribe a user to your newsletter on [ConvertKit](https://convertkit.com/):

- Define component to collect user email
- Perform API request to sign up the user to the newsletter
- Implement the code to subscribe the user using Effect

***

This project is part of my weekly newsletter at [**sandromaglione.com**](https://www.sandromaglione.com/newsletter?ref=Github&utm_medium=newsletter_project&utm_term=effect).


<a href="https://www.sandromaglione.com/newsletter?ref=Github&utm_medium=newsletter_project&utm_term=effect">
    <img alt="sandromaglione.com Newsletter weekly project" src="https://www.sandromaglione.com/static/images/newsletter_banner.webp" target="_blank" /> 
</a>

## Project structure
The core of the project is implemented inside [`lib`](./lib). The files inside `lib` contain the services and configurations defined using **Effect**.

[`app`](./app) contains all the pages and API routes (`nextjs`).

**Read all the details in the full article** 👇

<a href="https://www.sandromaglione.com/articles/how-to-implement-a-custom-newsletter-form-with-convertkit-and-effect?ref=Github&utm_medium=newsletter_project&utm_term=effect">
    <img alt="Read the full article on my website" src="https://www.sandromaglione.com/api/image?title=Custom%20Newsletter%20form%20with%20ConvertKit%20and%20Effect&publishedAt=2023-11-23" target="_blank" /> 
</a>


### Testing
[`test`](./test) contains some tests of the Effect program. The app uses `vitest` and `msw` for testing.

**Read all the details in the full article** 👇

<a href="https://www.sandromaglione.com/articles/how-to-test-typescript-app-using-vitest-and-msw?ref=Github&utm_medium=newsletter_project&utm_term=effect">
    <img alt="Read the full article on own to setup and test the app using Effect" src="https://www.sandromaglione.com/api/image?title=How%20to%20test%20a%20Typescript%20app%20using%20vitest%20and%20msw&publishedAt=2023-11-24" target="_blank" /> 
</a>

