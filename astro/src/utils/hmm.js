
export function markov_step(tpm, state) {
    const p = tpm[state][0]

    return Math.random() < tpm[state][0] ? 0 : 1;
}

export function state_dep_process(state, mu, sigma) {
    return boxMullerTransform(mu[state], sigma[state]);
}


export function calc_delta(tpm) {
    const delta1 = tpm[1][0] / (tpm[0][1] + tpm[1][0]);
    const delta2 = 1 - delta1;
    return [delta1, delta2];
}

export function hmm(tpm, T, mu, sigma) {
    const delta = calc_delta(tpm);
    const delta1 = delta[0];

    var s_t =[]
    var x_t = []

    s_t[0] = Math.random() < delta1 ? 0 : 1;
    x_t[0] = state_dep_process(s_t[0], mu, sigma);

    for (let t = 1; t <= T; t++) {
        s_t[t] = markov_step(tpm, s_t[t-1]);
        x_t[t] = state_dep_process(s_t[t], mu, sigma);
    }
    return [s_t, x_t]

}

// thanks to https://mika-s.github.io/javascript/random/normal-distributed/2019/05/15/generating-normally-distributed-random-numbers-in-javascript.html
function boxMullerTransform(mu, sigma) {

    const u1 = Math.random();
    const u2 = Math.random();

    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

    return z0 * sigma + mu;
}







