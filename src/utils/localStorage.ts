export const getToken:GetTokenType = () =>{
    let token = localStorage.getItem('Authorization');
    if (token) {
        return token.split(' ')[1];
    }
    return undefined
}

export type GetTokenType = () => string | undefined