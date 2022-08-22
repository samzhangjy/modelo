# Modelo

Instantly record your codes.

## Usage

Clone this repository and install the dependencies:

```bash
yarn
```

Then create a new file named `.env` (or use `export` commands to directly set the environment variables) with something similar to:

```
# database to connect to
DATABASE_URL="postgresql://user:password@host/modelo"

# admin account information
ADMIN_USERNAME = "modelo"
ADMIN_PASSWORD = "super-password"
SESSION_PASSWORD = "really_complex_password_that_is_more_than_32_chars"
NEXT_PUBLIC_ADMIN_NAME = "John Doe"
```

Then run `yarn dev` to start the development server!

## Licensing

Modelo is licensed under the MIT License. See `LICENSE` for details.
