
pipeline {
  agent any

  environment {
    AWS_REGION = 'ap-south-1'
    ACCOUNT_ID = '608942062188'
    REGISTRY   = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    REPO       = "${REGISTRY}/frontend"
    NAMESPACE  = 'three-tier'
    CLUSTER    = 'mern-cluster'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build image') {
      steps {
        sh 'docker build -t $REPO:$BUILD_NUMBER .'
      }
    }

    stage('Push to ECR') {
      steps {
        sh '''
          aws ecr get-login-password --region $AWS_REGION |
            docker login --username AWS --password-stdin $REGISTRY
          docker push $REPO:$BUILD_NUMBER
        '''
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh '''
          aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER

          C=$(kubectl -n $NAMESPACE get deployment frontend \
            -o jsonpath='{.spec.template.spec.containers[0].name}')

          kubectl -n $NAMESPACE set image \
            deployment/frontend $C=$REPO:$BUILD_NUMBER

          kubectl -n $NAMESPACE rollout status \
            deployment/frontend --timeout=180s || {
              kubectl -n $NAMESPACE rollout undo deployment/frontend
              exit 1
            }
        '''
      }
    }
  }
}

