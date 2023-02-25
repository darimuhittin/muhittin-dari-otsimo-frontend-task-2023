import type { MealType } from '../../types/global'
import { Row, Col } from 'react-bootstrap'
import styles from './SelectionCard.module.scss'
import { Link } from 'react-router-dom'

const SelectionCard = ({ meal, index }: { meal: MealType; index: number }): JSX.Element => {
  return (
    <Link to={`/meals/${meal.id}`} className={styles.link}>
      <Row className={styles.container}>
        <Col md={{ span: 6, order: index % 2 === 0 ? 2 : 1 }}>
          <div className={styles.image_container}>
            <img
              src={`/images/meals/${Math.round(Math.random() * 3) + 1}.jpg`}
              alt="meal"
              width={'100%'}
              height={'auto'}
            />
          </div>
        </Col>
        <Col md={{ span: 6, order: index % 2 === 0 ? 1 : 2 }} className={styles.description}>
          <h4 className={styles.meal_name}>{meal.name}</h4>
          <div className={styles.meal_ingredients}>
            <i>{meal.ingredients.map((e) => e.name).join(', ')}</i>
          </div>
        </Col>
      </Row>
    </Link>
  )
}

export default SelectionCard
