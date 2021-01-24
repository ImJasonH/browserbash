# BrowserBash for Cloud Run

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

## Build

```
pack build gcr.io/kontaindotme/browserbash --builder gcr.io/buildpacks/builder:v1 --publish
```

## Run Locally

```
docker run -p 8080:8080 --pull=always gcr.io/kontaindotme/browserbash
```

## Deploy

```
gcloud run deploy shell --image=gcr.io/kontaindotme/browserbash --max-instances=1 --allow-unauthenticated --platform=managed
```

🚨Currently Broken🚨

The server starts, but requests fail with HTTP 503.

Logs say:
```
The request failed because either the HTTP response was malformed or connection to the instance had an error.
```
