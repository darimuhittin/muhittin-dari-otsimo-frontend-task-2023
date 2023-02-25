import styles from './BudgetInput.module.scss'
import classNames from '../../util/classNames'
import { Row, Col } from 'react-bootstrap'

const BudgetInput = ({
  value,
  errorMessage,
  title,
  buttonTitle,
  onChange,
  onClick
}: {
  value: number
  errorMessage: string
  title: string
  buttonTitle: string
  onChange: (e: number) => void
  onClick: () => void
}): JSX.Element => {
  return (
    <div className={styles.budget_calculator}>
      <span className={styles.budget_calculator__header}>{title} :</span>
      <Row
        className={classNames('d-flex align-items-start', styles.budget_calculator__input_section)}>
        <Col xs={4}>Budget :</Col>
        <Col xs={8}>
          <input
            type="number"
            placeholder="Budget"
            className={classNames(styles.budget_calculator__input, 'shadow-none')}
            onChange={(e) => {
              onChange(parseFloat(e.target.value))
            }}
            // This conversion is necessary because of leading zeros
            value={value.toString()}
            max={999}
            min={0}
          />
        </Col>
      </Row>
      {errorMessage.length > 0 ? <p className="text-danger">{errorMessage}</p> : null}
      <button className={classNames(styles.calculate_button, 'font-jost')} onClick={onClick}>
        {buttonTitle}
      </button>
    </div>
  )
}

export default BudgetInput
