const createUtils = function ({ app, store, redirect }) {
  const imtf = {
    init() {},
    async getProducts() {
      const pstore = store.getters["app/getItem"]("products");
      if (pstore && pstore.length > 0) {
        return pstore;
      }

      const products = await app.$xhr.api
        .post("/api/seasonality", { action: "getProducts" })
        .then((response) => {
          store.commit("app/products", response.data.results.products);
          return response.data.results.products;
        });
      return products;
    },
    async getSubscriptions(contactID) {
      console.log(contactID);
      const subscriptions = await app.$xhr.api
        .post("/api/seasonality", {
          action: "getSubscriptionsByUserID",
          contact_id: contactID,
        })
        .then((response) => {
          return response.data.results;
        });
      return subscriptions;
    },
    async userKeapData(email) {
      let self = this;
      // email = 'autoforex@yahoo.com'
      const userData = await app.$xhr.api
        .post("/api/seasonality", { action: "getUserByEmail", email })
        .then((response) => {
          return (window.location.href = "./scanner");
        });
      return userData;
    },
    async subscriberFlow(email) {
      const result = await imtf.userKeapData(email).then((userData) => {
        if (userData && userData.id) {
          const tags = userData.tag_ids;
          if (tags.includes("2582")) {
            return true;
          }
          /* const subscriptions = imtf.getSubscriptions(userData.id).then((subs) => {
            if (subs.subscriptions.length > 0) {
              const actives = []
              subs.subscriptions.forEach((sub, i) => {
                if (sub.active === true) {
                  actives.push(sub)
                }
              })
              store.commit('app/activeSubscriptions', actives)
              return actives
            }
            return false
          })
          return subscriptions */
        }
        return false;
      });
      return result;
    },
  };
  imtf.init();
  return imtf;
};

export default function (ctx, inject) {
  inject("imtf", createUtils(ctx));
}
