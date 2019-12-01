

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import java.sql.PreparedStatement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

/**
 * Servlet implementation class displayProjects
 */
@WebServlet("/validateProjectUser")
public class validateProjectUser extends HttpServlet {
	private class error{
		private String msg;
		public error(String msg) {
			this.msg = msg;
		}
	}
	private static final long serialVersionUID = 1L;
	public static final String CREDENTIALS_STRING = "jdbc:mysql://google/spoolDB?cloudSqlInstance=projectmanagement-259305:us-west1:projectmanagement&socketFactory=com.google.cloud.sql.mysql.SocketFactory&useSSL=false&user=projectManagement&password=CSCI201";
	static Connection connection = null;

	protected void service (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = request.getSession();
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(CREDENTIALS_STRING);
			String user = request.getParameter("username");
			int projectID = (int)session.getAttribute("projectID");
			PreparedStatement ps = connection.prepareStatement("SELECT u.userName FROM user u WHERE u.userName = ?");
			ps.setString(1, user);
			ResultSet rs = ps.executeQuery();
			if(!rs.next()) {
				error err = new error("User does not exist");
				String json = new Gson().toJson(err);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
			}
			else {
				PreparedStatement getUserID = connection.prepareStatement("SELECT u.userID FROM user u WHERE u.userName = ?");
				getUserID.setString(1, user);
				ResultSet addUserID = getUserID.executeQuery();
				int userID = -1;
				if(addUserID.next()) {
					userID = addUserID.getInt("userID");
				}
				PreparedStatement ps2 = connection.prepareStatement("SELECT uip.userName FROM usersInProject uip, project p WHERE uip.userName = ? AND uip.projectID = p.projectID AND p.projectID = ?");
				ps2.setString(1, user);
				ps2.setInt(2, projectID);
				ResultSet rs2 = ps2.executeQuery();
				if(!rs2.next()) {
					PreparedStatement add = connection.prepareStatement("INSERT INTO userInProject(projectID, userID, userName) VALUES (?,?,?)");
					add.setInt(1, projectID);
					add.setInt(2, userID);
					add.setString(3, user);
					add.execute();
				}
			}
			connection.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
