using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Exceptions;
using System;

namespace ReviewAppProject.Data.Repository
{
    public class FacultyRepository
    {
        private readonly AppDbContext _context;

        public FacultyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Faculty>> GetAllFacultiesAsync()
        {
            return await _context.Faculties.OrderBy(f => f.FacultyId)
                .ToListAsync();
        } 

        public async Task<bool> CreateFacultyAsync(string facultyName)
        {
            var faculty = new Faculty
            {
                FacultyName = facultyName
            };
            try
            {
                _context.Faculties.Add(faculty);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) {
                Console.WriteLine($"Exception during database query: {ex.Message}");
                throw new CouldNotAddFacultyToDatabase();
            }
            return true;
        }
    }
}
