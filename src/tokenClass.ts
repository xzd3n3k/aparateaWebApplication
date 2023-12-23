class TokenClass {
    private token: string;
    private expires: Date;

    constructor(token: string, expires: Date) {
        this.token = token;
        this.expires = expires;
    }

    setTokenData(token: string, expires: Date): void {
        this.token = token;
        this.expires = expires;
    }

    getTokenData(): { token: string; expires: Date } {
        return {
            token: this.token,
            expires: this.expires,
        };
    }
}

export default TokenClass;

