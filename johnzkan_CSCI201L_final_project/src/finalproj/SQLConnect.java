package finalproj;

import java.sql.Connection;
import java.sql.DriverManager;

public class SQLConnect {
	
	 static Connection connection = null;
	 public static Connection getCon() {
		 try {
				Class.forName("com.mysql.jdbc.Driver");
				
				connection = DriverManager.getConnection("jdbc:mysql://google/spoolDB?cloudSqlInstance=projectmanagement-259305:us-west1:projectmanagement&socketFactory=com.google.cloud.sql.mysql.SocketFactory&useSSL=false&user=projectManagement&password=CSCI201");
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		 return connection;
	 }
	 
}
