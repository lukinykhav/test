function Sha256Hashing(username, email, password, cycle) {
    Md5Hashing.apply(this, arguments);

    this.alg = new Hashes.SHA256();
}

