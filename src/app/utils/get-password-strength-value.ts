import zxcvbn from 'zxcvbn';

const PASSWORD_STRENGTH_SCORES = {
    WEAK: 30,
    MEDIUM: 60,
    STRONG: 100
} as const;

export const getPasswordStrengthValue = (password: string): number => {
    if(!password) return 0;

    const { score } = zxcvbn(password);

    if(score <= 1) return PASSWORD_STRENGTH_SCORES.WEAK;
    if(score <= 3) return PASSWORD_STRENGTH_SCORES.MEDIUM;
    return PASSWORD_STRENGTH_SCORES.STRONG;
}