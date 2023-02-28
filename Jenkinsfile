pipeline {
  agent any
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
        sh 'echo "loading ec2"'
      }
    }

    stage('deploy image to ec2') {
      steps {
        sh 'echo "deploy image to ec2"'
      }
    }

  }
}

withCredentials([usernamePassword(credentialsId: 'amazon', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
  // available as an env variable, but will be masked if you try to print it out any which way
  // note: single quotes prevent Groovy interpolation; expansion is by Bourne Shell, which is what you want
  sh 'echo $PASSWORD'
  // also available as a Groovy variable
  echo USERNAME
  // or inside double quotes for string interpolation
  echo "username is $USERNAME"
}