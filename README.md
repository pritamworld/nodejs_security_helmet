# Self Signed Certificates
SSL/TLS certificates can be created on your own and technically they can be used, however it is important to note that these certificates should not be used in a production environment. This is because using your own "self signed" certificates will result in a warning from the browser that your website is using an "untrusted" certificate, since it did not come from a trusted CA.

## Creating Self Signed Certificates (Development)
When testing HTTPS locally and during development, it is common to use a self signed certificate. We can generate them in the terminal using the following command:

```openssl req -new -x509 -nodes -out server.crt -keyout server.key```

# Reference
- https://www.digicert.com/what-is-an-ssl-certificate
- https://www.openssl.org/
- https://helmetjs.github.io/
- https://www.npmjs.com/package/bcrypt