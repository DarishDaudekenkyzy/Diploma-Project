using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using System;

namespace ReviewAppProject.Data.Repository
{
    public class FacultyRepository : IFacultyRepository
    {
        private readonly AppDbContext _context;

        public FacultyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async IAsyncEnumerable<Faculty> GetAllFacultiesAsync()
        {
            var faculties = _context.Faculties.OrderBy(f => f.FacultyId).AsAsyncEnumerable();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async IAsyncEnumerable<Faculty> GetUniversityFaculties(int universityId) {
            var faculties = _context.Faculties
                .Where(f => f.UniversityId == universityId)
                .OrderBy(f => f.FacultyId)
                .AsAsyncEnumerable();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async Task<Faculty> GetFacultyByIdAsync(int facultyId)
        {
            return await _context.Faculties.FirstOrDefaultAsync(f => f.FacultyId.Equals(facultyId))
                ?? throw new FacultyNotFoundException();

        }
        
        public async Task<Faculty> GetFacultyByNameAsync(string facultyName)
        {
            return await _context.Faculties.FirstOrDefaultAsync(f => f.FacultyName.Equals(facultyName))
                ?? throw new FacultyNotFoundException();

        }

        public async Task<bool> CreateFacultyAsync(string facultyName)
        {
            if (facultyName.IsNullOrEmpty()) { throw new ArgumentException(); }
            Faculty faculty;
            try
            {
                faculty = await GetFacultyByNameAsync(facultyName);
                if (faculty != null) throw new FacultyWithNameExistsException();
                return false;
            }
            catch (FacultyNotFoundException)
            {
                faculty = new Faculty
                {
                    FacultyName= facultyName,
                };

                _context.Faculties.Add(faculty);
                await _context.SaveChangesAsync();

                return true;
            }
        }
    }
}
