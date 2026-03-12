import { motion } from 'framer-motion';
import useInView from '../../hooks/useInView';

function AnimatedText({ children, tag: Tag = 'div', delay = 0 }) {
  const { ref, isVisible } = useInView(0.15);

  const words = typeof children === 'string'
    ? children.split(' ')
    : [children];

  return (
    <Tag ref={ref} style={{ overflow: 'hidden' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * 0.06,
          }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

export default AnimatedText;
