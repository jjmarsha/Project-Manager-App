

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
 * Servlet implementation class register
 */
@WebServlet("/register")
public class register extends HttpServlet {
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
			String userName = request.getParameter("userame");
			String passWord = request.getParameter("password");
			String samePass = request.getParameter("samePass");
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(CREDENTIALS_STRING);
			if(userName == null || passWord == null || samePass == null || userName == "" || passWord == "" || samePass == "") {
				error err = new error("Please fill in all fields!");
				String json = new Gson().toJson(err);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
			}
			else if(!passWord.equals(samePass)) {
				error err = new error("Passwords do not match!");
				String json = new Gson().toJson(err);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
			}
			else {
				PreparedStatement ps = connection.prepareStatement("SELECT u.userName FROM user u WHERE u.userName= ?");
				ps.setString(1, userName);
				ResultSet rs = ps.executeQuery();
				if(rs.next()) {
					error err = new error("Username is already in use!");
					String json = new Gson().toJson(err);
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write(json);
				}
				else {
					PreparedStatement reg = connection.prepareStatement("INSERT INTO user(userName, password, isAdmin) VALUES(?,?,?)");
					reg.setString(1, userName);
					reg.setString(2, passWord);
					reg.setInt(3, 0);
					reg.execute();
				}
			}
			connection.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
