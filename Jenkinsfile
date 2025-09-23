pipeline {
    agent any

    stages {

        stage('Build Frontend') {
            steps {
                dir('artgalleryproj(fsad)') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-frontend" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-frontend"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-frontend"
                xcopy /E /I /Y artgalleryproj(fsad)\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-frontend"
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('SpringBootProjectBackend') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-backend.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-backend.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-backend" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-backend"
                )
                copy "SpringBootProjectBackend\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\artgallery-backend.war"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
