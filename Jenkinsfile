pipeline {
  agent any

   environment {
        AMI = 'ami-0c0d3776ef525d5dd'
        COUNT = '1'
        TYPE = 't2.small'
        KP = 'Jenkins'
        SG = 'sg-995ea6e9'
        SN ='subnet-9986f7f3'
    }

  stages {
    stage('Build image') {
      steps {
        sh '''
          cd passmaker
          docker build -t passmaker .
          docker tag passmaker:latest nrdevac1/passmaker:latest
          '''
      }
    }

    stage('Push to Repo') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dh_cred', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh '''
            docker login -u $USERNAME -p $PASSWORD
            docker push nrdevac1/passmaker:latest
            '''
          }
      }
    }

    stage('load EC2 with k8s') {
      steps {
        sh '''
          aws ec2 run-instances --image-id ${AMI} --count ${COUNT} --instance-type ${TYPE}  --key-name ${KP} --security-group-ids ${SG} --subnet-id ${SN}
        '''
      }
    }
  }
}

