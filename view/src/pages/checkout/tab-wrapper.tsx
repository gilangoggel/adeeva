import { motion } from 'framer-motion'

export const TabWrapper = ({children}: any) => {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        opacity:{
          duration :1
        }
      }}
    >
      {children}
    </motion.div>
  );
};
