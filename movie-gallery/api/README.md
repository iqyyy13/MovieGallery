### Steps to Generate an API Key and Access Token

1. **Create a TMDb Account**:
   - Visit [The Movie Database (TMDb)](https://www.themoviedb.org/) and sign up for an account.

2. **Apply for an API Key**:
   - Go to the [API section](https://www.themoviedb.org/settings/api) of your account settings.
   - Follow the instructions to apply for an API key. Once approved, you will receive your API key.

3. **Generate an Access Token** (optional but recommended for certain features):
   - You can generate an access token by following the instructions in the TMDb API documentation. This typically involves using the API key to make an authentication request.

4. **Update Your Environment Variables**:
   - Create a `.env` file in the root directory of the project if you haven't already.
   - Add your API key and access token to the `.env` file:
     ```env
     TMDB_API_KEY=your_api_key_here
     TMDB_ACCESS_TOKEN=your_access_token_here
     ```

5. **Set Up Your API Queries**:
   - Update the API queries in the `api` folder of the app to utilize your new API key and access token.

### Running the App

Once you have your API key and access token set up, follow the installation and running instructions provided earlier to launch the Movie Gallery app.
