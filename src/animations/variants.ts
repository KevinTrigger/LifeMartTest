export const formOrderVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: (custom: any) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.3 },
  }),
};

export const formAddVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

export const productVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  
}