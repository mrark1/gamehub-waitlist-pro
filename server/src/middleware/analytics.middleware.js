const analytics = (action) => {
  return (req, res, next) => {
    console.log(`[Analytics] ${action}`);
    next();
  };
};

export default analytics;