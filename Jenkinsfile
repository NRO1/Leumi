pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                echo "installing dependencies"
                sh '''
                cd passmaker
                npm install
                '''
            }
        }
    }
}