import classNames from '../../util/classNames'
import styles from './LineHeader.module.scss'
const LineHeader = ({ text }: { text: string }): JSX.Element => {
  return (
    <div className={classNames('text-center mb-4', styles.container)}>
      <span className={classNames(styles.lined, 'font-jost')}>{text.toUpperCase()}</span>
    </div>
  )
}

export default LineHeader
