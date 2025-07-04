import React from 'react'
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getCourseModule } from "../../../services/courseModuleServices";
import Module from '../Module';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";

// Mocking the getCourseModule function
jest.mock("../../../services/courseModuleServices", () => {
  const originalModule = jest.requireActual("../../../services/courseModuleServices");
  return {
    __esModule: true,
    ...originalModule,
    getCourseModule: jest.fn(),
  };
});

// Mocking next/navigation hooks
jest.mock("next/navigation", () => {
  const originalModule = jest.requireActual("next/navigation");
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(),
    useRouter: jest.fn(),
    useParams: jest.fn(),
  };
});

// Mocking Link component
jest.mock("next/link", () => {
  return ({ children, href }) => <a href={href}>{children}</a>;
});

describe('Module() Module method', () => {
  beforeEach(() => {
    // Mocking useParams to return a specific courseId
    useParams.mockReturnValue({ id: '123' });

    // Mocking useRouter
    useRouter.mockReturnValue({});

    // Mocking useSearchParams
    useSearchParams.mockReturnValue(new URLSearchParams());
  });

  describe('Happy Paths', () => {
    it('should render loading state initially', () => {
      // Mocking getCourseModule to return a promise that resolves
      getCourseModule.mockResolvedValueOnce({ data: [] });

      render(<Module />);

      // Check for loading spinner and text
      expect(screen.getByText('Loading modules...')).toBeInTheDocument();
    });

    it('should render modules correctly when data is fetched', async () => {
      // Mocking getCourseModule to return a promise with module data
      const mockModules = [
        { id: '1', title: 'Module 1', description: 'Description 1', percentage: 50 },
        { id: '2', title: 'Module 2', description: 'Description 2', percentage: 75 },
      ];
      getCourseModule.mockResolvedValueOnce({ data: mockModules });

      render(<Module />);

      // Wait for modules to be rendered
      await waitFor(() => {
        expect(screen.getByText('Module 1')).toBeInTheDocument();
        expect(screen.getByText('Module 2')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle no modules gracefully', async () => {
      // Mocking getCourseModule to return an empty array
      getCourseModule.mockResolvedValueOnce({ data: [] });

      render(<Module />);

      // Wait for loading to finish
      await waitFor(() => {
        expect(screen.queryByText('Loading modules...')).not.toBeInTheDocument();
      });

      // Check that no modules are displayed
      expect(screen.queryByText('Module 1')).not.toBeInTheDocument();
    });

    it('should handle error in fetching modules', async () => {
      // Mocking getCourseModule to throw an error
      getCourseModule.mockRejectedValueOnce(new Error('Failed to fetch'));

      render(<Module />);

      // Wait for loading to finish
      await waitFor(() => {
        expect(screen.queryByText('Loading modules...')).not.toBeInTheDocument();
      });

      // Check that no modules are displayed
      expect(screen.queryByText('Module 1')).not.toBeInTheDocument();
    });
  });
});