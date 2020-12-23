import './Skeleton.styles.css'

import {IonItem, IonLabel, IonSkeletonText} from '@ionic/react'
import React from 'react'

const Skeleton: React.FC = () => {
  return (
    <IonItem id="rc-skeleton-item">
      <IonSkeletonText animated className="rc-first" slot="start" />
      <IonLabel>
        <h3>
          <IonSkeletonText animated className="rc-second" />
        </h3>
        <p>
          <IonSkeletonText animated className="rc-third" />
        </p>
        <p>
          <IonSkeletonText animated className="rc-fourth" />
        </p>
      </IonLabel>
    </IonItem>
  )
}

export default Skeleton
