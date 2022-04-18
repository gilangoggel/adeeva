import { motion } from 'framer-motion'

export const Wrapper = ({children}: any) => {

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
    >
      {children}
    </motion.div>
  );
};
