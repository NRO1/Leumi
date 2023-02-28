pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        echo 'Installing dependencies'
        sh '''
          cd passmaker
          npm install
        '''
      }
    }

  }
}