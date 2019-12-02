
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

/**
 * Servlet implementation class taskServlet
 */
@WebServlet("/taskServlet")
public class taskServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		userSQLInfo us = new userSQLImplement();
		Task currTask = new Task();
		Task newTask = new Task();

		// get all the task info
		String taskName = request.getParameter("taskName");
		String projID = request.getParameter("projectID");
		String descript = request.getParameter("description");
		String date = request.getParameter("date");
		String status = request.getParameter("status");
		String submitButton = request.getParameter("button");
				
		// check if date is not correctly formatted:
//		dateValidate d = new dateValidate();
//		if (!d.dateValid(date, "yyyy-MM-dd")) {
//			response.getWriter().append("Served at: ").append(request.getContextPath());
//			// display error message
//			String json = new Gson().toJson("{ \"msg\":\"Please fill in all fields!\"}");
//			response.setContentType("application/json");
//			response.setCharacterEncoding("UTF-8");
//			response.getWriter().write(json);
//			response.sendRedirect("displayProjectwithTask");
//		}

		// insert a task
		if (submitButton.equals("create-task")) {

			// get the next taskID
			newTask.setDate(date);
			newTask.setDescription(descript);
			newTask.setName(taskName);
			newTask.setProjID(projID);
			newTask.setStatus(status);
			us.insertTask(newTask);

			response.sendRedirect("displayProjectwithTask");
		}

		// edit a task
		else if (submitButton.equals("edit-task")) {
			System.out.println("HI");

			// create clientchat ioajsdoi = new clinet chat;

			String taskID = request.getParameter("taskID");
			currTask.setTaskID(taskID);
			currTask.setDate(date);
			currTask.setDescription(descript);
			currTask.setName(taskName);
			currTask.setProjID(projID);
			currTask.setStatus(status);
			us.editTask(currTask);
			HttpSession session = request.getSession();
//			session.setAttribute("projectID", projID);
//			response.sendRedirect("displayProjectwithTask");
		}

		else if (submitButton.equals("delete-task")) {
			String taskID = request.getParameter("taskID");
			us.remTask(taskID);
			response.sendRedirect("displayProjectwithTask");
		}
	}
}
