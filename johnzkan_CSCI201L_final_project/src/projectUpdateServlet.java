

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class projectUpdateServlet
 */
@WebServlet("/projectUpdateServlet")
public class projectUpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	public static final String CREDENTIALS_STRING = "jdbc:mysql://google/spoolDB?cloudSqlInstance=projectmanagement-259305:us-west1:projectmanagement&socketFactory=com.google.cloud.sql.mysql.SocketFactory&useSSL=false&user=projectManagement&password=CSCI201";
	static Connection connection = null;

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(CREDENTIALS_STRING);
			HttpSession session = request.getSession();
			int projectID = (int) session.getAttribute("projectID");
			String newGithub = (String) request.getParameter("github");
			PreparedStatement updateProject = connection.prepareStatement("UPDATE project SET github=? WHERE projectID=?");
			updateProject.setString(1, newGithub);
			updateProject.setInt(2, projectID);
			updateProject.execute();
			
			connection.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
